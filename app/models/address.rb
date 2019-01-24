class Address < ApplicationRecord
  belongs_to :order

  validates :email, :first_name, :last_name, :street, :postal_code, :city, :province, :country,
    presence: true

  after_create :update_order_status

  def name
    "#{first_name} #{last_name}"
  end

  private

  def update_order_status
    order.update(status: Status.find_by_text("address entered"))
  end
end
