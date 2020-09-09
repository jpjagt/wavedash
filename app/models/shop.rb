class Shop < ApplicationRecord
  enum :selection_rating => { none: 0, positive: 1, negative: 2 }, _prefix: :selection_rating

  validates :name, presence: true, uniqueness: true
end
