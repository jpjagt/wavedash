class Garment < ApplicationRecord
  belongs_to :category

  has_many :images

  def path
    self.name.parameterize
  end

  def self.find_by_path(path)
    self.find_by(name: path.gsub(/-/, ' '))
  end
end
