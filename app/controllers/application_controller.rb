class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :set_order

  private

  def set_order
    begin
      @order = Order.find(session[:order_id])
    rescue ActiveRecord::RecordNotFound
      # create a new order
      @order = Order.create
      session[:order_id] = @order.id
    end
  end
end
