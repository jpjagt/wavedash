class Garment < ApplicationRecord
  belongs_to :category

  has_many :order_items
  has_many :orders, through: :order_items

  has_many_attached :images

  def price
    self.euros + (self.cents / 100.0)
  end

  def slug
    self.name.parameterize
  end

  def self.find_by_slug(slug)
    self.find_by(name: slug.gsub(/-/, ' '))
  end

  def thumbnail
    images.first&.path || "wavedash.png"
  end
end
