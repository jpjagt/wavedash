class Status < ApplicationRecord
  has_many :orders, dependent: :nullify

  scope :updateable, -> { where(text: ["paid", "delivering", "completed"]) }
end
