class AddressesController < ApplicationController
  before_action :validate_order

  def new
    @address = @order.address || Address.new
  end

  def create
    @order.address.destroy unless @order.address.nil?
    @address = Address.new(address_params.merge(order: @order))

    if @address.save
      redirect_to payment_path
    else
      render :new
    end
  end

  private

  def address_params
    params.require(:address).permit(:first_name, :last_name, :email, :street, :postal_code, :city, :province, :country)
  end

  def validate_order
    if @order.empty?
      redirect_to cart_path
    end
  end
end
