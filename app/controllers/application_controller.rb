class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :set_reverse_colors

  def set_reverse_colors
    @reverse_colors = !params[:night].nil?
  end
end
