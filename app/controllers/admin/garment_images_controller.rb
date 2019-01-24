class Admin::GarmentImagesController < Admin::BaseController
  before_action :set_garment, only: [:index]

  def index
    @images = @garment.images
  end

  def destroy
    image = ActiveStorage::Attachment.find(params[:id])
    image.purge

    redirect_back(fallback_location: request.referer)
  end

  private

  def set_garment
    @garment = Garment.find(params[:garment_id])
  end
end
