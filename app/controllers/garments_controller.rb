class GarmentsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:add]

  before_action :set_garment

  def show
  end

  def add
    added = @order.add(@garment, params[:size])
    render json: { added: added }
  end

  private

  def set_garment
    @garment = Garment.find_by_slug(params[:slug])
  end
end
