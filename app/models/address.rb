class Address < ApplicationRecord
  belongs_to :order

  validates :street, presence: true, length: { in: 5..100 }
  validates :zipcode, presence: true, length: { is: 6 }
  validates :city, presence: true, length: { in: 2..30 }
  validates :state, presence: true, length: { in: 2..30 }
  validates :country, presence: true
end
