class AddressesController < ApplicationController
  def new
    @address = Address.new
  end

  def create
    @address = Address.new(address_params)

    if @address.save
      @order.update(address: address)
      redirect_to pay_path
    else
      render :new
    end
  end

  private

  def address_params
    params.require(:address).permit(:street, :zipcode, :city, :state, :country)
  end
end
