class PagesController < ApplicationController
  skip_before_action :redirect_to_root, only: [:home, :facade, :facade_api, :login]
  http_basic_authenticate_with name: "jeroen", password: "gridwave", only: [:login]

  def home
    unless logged_in?
      @images = %w[clay grass ink ocean ochre oldschool green pink spring]
      @hide_navbar = true
      render :facade
    else
      @categories = Category.all
      @hide_navbar = true
    end
  end

  def cart
  end

  def login
    session[:login] = "jeroen"
    redirect_to root_path
  end

  def label
    @hide_navbar = true
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
