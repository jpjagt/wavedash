class OrderItem < ApplicationRecord
  belongs_to :garment
  belongs_to :order

  validates :quantity, presence: true, numericality: { only_integer: true, greater_than: 0, less_than: 21 }
  validates :size, presence: true, inclusion: { in: %w[S M L] }

  def increase!(i)
    self.quantity = self.quantity + i

    if self.quantity.zero?
      return self.destroy.destroyed?
    else
      save
    end
  end

  def subtotal
    garment.price * quantity
  end
end
