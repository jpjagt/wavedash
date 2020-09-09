class Admin::ShopsController < Admin::BaseController
  before_action :set_shop, except: [:route_rate]

  def route_rate
    redirect_to rate_admin_shop_path(Shop.selection_rating_none.order(Arel.sql('RANDOM()')).first), status: 302
  end

  def rate
  end

  def update_rating
    if @shop.update(selection_rating: params[:selection_rating])
      flash[:notice] = "successfully #{params[:selection_rating] == 'positive' ? 'selected' : 'rejected'} #{@shop.name}"
      redirect_to route_rate_admin_shops_path, status: 302
    else
      flash[:alert] = 'couldn\'t update the rating for some reason...'
      render 'rate'
    end
  end

  private

  def set_shop
    @shop = Shop.find(params[:id])
  end
end
