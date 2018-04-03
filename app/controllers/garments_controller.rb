class GarmentsController < ApplicationController
  before_action :set_garment

  def show
  end

  private

  def set_garment
    @garment = Garment.find_by(name: params['name'])
  end
end
