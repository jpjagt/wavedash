class PagesController < ApplicationController
  skip_before_action :redirect_to_root, only: [:facade, :facade_api]

  def home
    @categories = Category.all

    @hide_navbar = true
  end

  def cart
  end

  def facade
    @images = %w[clay grass ink ocean ochre oldschool green pink spring]
    @hide_navbar = true
  end

  def facade_api
    if session[:tapped].nil?
      session[:tapped] = ""
    end

    unless session[:tapped].include? params[:colour]
      Tap.find_by(identifier: params[:colour]).increase!
      session[:tapped] = "#{session[:tapped]} #{params[:colour]}"
    end

    render json: { tapped: "tip tap" }
  end
end
