class Address < ApplicationRecord
  belongs_to :order

  validates :first_name, :last_name, :street, :postal_code, :city, :province, :country,
    presence: true

  def name
    "#{first_name} #{last_name}"
  end
end
