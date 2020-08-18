class GarmentsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:add]

  before_action :set_garment
  before_action :verify_garment_existence, only: [:show]

  def show
  end

  def add
    quantity = params[:quantity] || 1

    # we'll start using the order now, so persist in DB
    @order.save
    session[:order_id] = @order.id

    added, item_quantity = @order.add(@garment, params[:size], quantity)
    render json: { added: added, item_quantity: item_quantity }
  end

  private

  def verify_garment_existence
    raise_not_found unless @garment
  end

  def set_garment
    @garment = Garment.find_by_slug(params[:slug])
  end
end
