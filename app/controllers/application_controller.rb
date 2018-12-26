class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :set_order
  before_action :redirect_to_root

  private

  def redirect_to_root
    redirect_to root_path unless logged_in?
  end

  def set_order
    @order = Order.set_order(session[:order_id])
    session[:order_id] = @order.id unless @order.id == session[:order_id]
  end

  def logged_in?
    session[:login] == "jeroen"
  end
end
