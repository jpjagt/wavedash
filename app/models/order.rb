class Order < ApplicationRecord
  has_many :order_items
  has_many :garments, through: :order_items

  before_create :set_status

  def add(garment, quantity = 1)
    self.order_items.create(garment: garment, quantity: quantity)
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

  private

  def set_status
    self.status = 1
  end
end
