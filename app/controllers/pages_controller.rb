class PagesController < ApplicationController
  def home
    @categories = Category.all

    @hide_navbar = true
  end

  def cart
  end
end
