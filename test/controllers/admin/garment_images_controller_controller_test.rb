require 'test_helper'

class Admin::GarmentImagesControllerControllerTest < ActionDispatch::IntegrationTest
  test "should get destroy" do
    get admin_garment_images_controller_destroy_url
    assert_response :success
  end

end
