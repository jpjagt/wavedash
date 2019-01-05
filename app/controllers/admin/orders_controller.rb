class Admin::OrdersController < Admin::BaseController
  before_action :set_order, only: [:show]
  before_action :set_statuses, only: [:index]

  def index
    @orders = Order.all.select { |o| @statuses.include?(o.status) }.sort_by(&:status)
  end

  def show
  end

  private

  def set_order
    @order = Order.find(params[:id])
  end

  def set_statuses
    @statuses = ["address entered", "paid"]

    if params.has_key?(:statuses)
      if params[:statuses] == "all"
        @statuses << "browsing"
      else
        @statuses = params[:statuses].split(",")
      end
    end
  end
end
