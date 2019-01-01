class Admin::GarmentsController < Admin::BaseController
  before_action :set_garment, only: [:edit, :update, :destroy]

  def index
    @garments = Garment.all
    @units_sold = Order.units_sold
  end

  def new
    @garment = Garment.new
  end

  def create
    @garment = Garment.new(garment_params)

    if @garment.save
      redirect_to get_garment_path(@garment)
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @garment.update(garment_params)
      redirect_to get_garment_path(@garment)
    else
      render :edit
    end
  end

  def destroy
    @name = @garment.name
    @destroyed = @garment.destroy

    redirect_to admin_garments_path
  end

  private

  def garment_params
    params.require(:garment).permit(:name, :description, :euros, :cents, :category_id, :thumbnail, images: [])
  end

  def set_garment
    @garment = Garment.find(params[:id])
  end
end
