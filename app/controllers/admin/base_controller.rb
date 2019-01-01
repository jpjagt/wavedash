class Admin::BaseController < ApplicationController
  include ControllerHelper

  before_action :authenticate_admin!

  private

  def authenticate_admin!
    raise ActionController::RoutingError.new('Not Found') unless logged_in?
  end
end
