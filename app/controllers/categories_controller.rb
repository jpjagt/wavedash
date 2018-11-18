class CategoriesController < ApplicationController
  before_action :set_category

  def show
    @garments = @category.garments
  end

  private

  def set_category
    @category = Category.find_by(name: params['name'])
  end
end
