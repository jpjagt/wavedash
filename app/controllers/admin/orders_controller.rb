class Admin::OrdersController < Admin::BaseController
  before_action :set_order, only: [:show]
  before_action :set_statuses, only: [:index]

  def index
    @orders = Order.includes(:status).where(statuses: { text: @statuses }).order(:status_id)
  end

  def show
  end

  private

  def set_order
    @order = Order.find(params[:id])
  end

  def set_statuses
    @statuses = ["paid", "delivering", "completed"]

    if params.has_key?(:statuses)
      if params[:statuses] == "all"
        @statuses << "browsing"
        @statuses << "address entered"
      else
        @statuses = params[:statuses].split(",")
      end
    end
  end
end
