class Admin::OrdersStatusesController < Admin::BaseController
  before_action :set_order, only: [:update]

  def update
    @order.update(order_params)
    redirect_to admin_order_path(@order)
  end

  private

  def order_params
    params.require(:order).permit(:status_id)
  end

  def set_order
    @order = Order.find(params[:id])
  end
end
