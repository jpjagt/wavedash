class GarmentsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:add]

  before_action :set_garment

  def show
  end

  def add
    quantity = params[:quantity] || 1

    added, item_quantity = @order.add(@garment, params[:size], quantity)
    render json: { added: added, item_quantity: item_quantity }
  end

  private

  def set_garment
    puts params[:slug]
    puts Garment.first.slug
    @garment = Garment.find_by_slug(params[:slug])
  end
end
