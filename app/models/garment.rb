class Garment < ApplicationRecord
  belongs_to :category

  has_many :images

  def price
    ActionController::Base.helpers.number_to_currency(self.euros + (self.cents / 100.0))
  end

  def path
    self.name.parameterize
  end

  def self.find_by_path(path)
    self.find_by(name: path.gsub(/-/, ' '))
  end

  def thumbnail
    images.first&.src || ""
  end
end
