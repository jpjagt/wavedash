class CategoriesController < ApplicationController
  before_action :set_category
  before_action :verify_category_existence, only: [:show]

  def show
    @garments = @category.garments
  end

  def socks
    @pink = Garment.find_by_name('televeyeze pink')
    @blue = Garment.find_by_name('televeyeze blue')
    @pink_img = 'https://images.unsplash.com/photo-1577988932535-e1f04b4969b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80'
    @blue_img = 'https://images.unsplash.com/photo-1560159006-de4e5ffcfd47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80'
  end

  private

  def verify_category_existence
    raise_not_found unless @category
  end

  def set_category
    @category = Category.find_by(name: params['name'])
  end
end
