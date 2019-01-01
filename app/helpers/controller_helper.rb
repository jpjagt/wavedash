module ControllerHelper
  def get_garment_path(garment)
    garment_path(garment.category.name, garment.slug)
  end

  def logged_in?
    session[:login] == "jeroen"
  end
end
