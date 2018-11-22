class Order < ApplicationRecord
  has_many :order_items
  has_many :garments, through: :order_items

  before_create :set_status

  def add(garment, size, quantity = 1)
    if order_items.exists?(garment: garment, size: size)
      item = order_items.find_by(garment: garment, size: size)
      item.increase!(quantity)
    else
      order_items.create(garment: garment, size: size, quantity: quantity).persisted?
    end
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

  def count
    self.order_items.map(&:quantity).sum
  end

  def subtotal
    order_items.map(&:subtotal).sum
  end

  private

  def set_status
    self.status = 1
  end
end
