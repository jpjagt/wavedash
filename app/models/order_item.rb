class OrderItem < ApplicationRecord
  belongs_to :garment
  belongs_to :order

  validates :quantity, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :size, presence: true

  def increase!(i)
    self.quantity = self.quantity + i
    save
  end

  def subtotal
    garment.price * quantity
  end
end
