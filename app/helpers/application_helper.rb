module ApplicationHelper
  def get_garment_path(garment)
    garment_path(garment.category.name, garment.path)
  end
end
