class CategoriesController < ApplicationController
  before_action :set_category
  before_action :verify_category_existence, only: [:show]

  def show
    @garments = @category.garments
  end

  private

  def verify_category_existence
    raise_not_found unless @category
  end

  def set_category
    @category = Category.find_by(name: params['name'])
  end
end
