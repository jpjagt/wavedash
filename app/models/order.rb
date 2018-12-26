class Order < ApplicationRecord
  has_many :order_items, dependent: :destroy
  has_many :garments, through: :order_items

  has_one :address, dependent: :destroy

  before_create :set_status

  def add(garment, size, quantity = 1)
    return false, nil unless status == 1

    if order_items.exists?(garment: garment, size: size)
      item = order_items.find_by(garment: garment, size: size)
      persisted = item.increase!(quantity)
    else
      item = order_items.create(garment: garment, size: size, quantity: quantity)
      persisted = item.persisted?
    end

    return persisted, item.quantity
  end

  def status_text
    case status
    when 1
      "browsing"
    when 2
      "completed"
    else
      "invalid status"
    end
  end

  def quantity
    order_items.map(&:quantity).sum
  end

  def subtotal
    order_items.map(&:subtotal).sum
  end

  def stripe_amount
    # stripe wants amount in cents in integer
    (subtotal * 100).to_i
  end

  def empty?
    order_items.empty?
  end

  def paid?
    !paid_at.nil?
  end

  def mark_as_paid!
    self.paid_at = DateTime.now
    save
  end

  def self.set_order(id)
    if exists?(id)
      order = find(id)
      return order unless order.paid?
    end

    # create a new order
    return Order.create
  end

  private

  def set_status
    self.status = 1
  end
end
