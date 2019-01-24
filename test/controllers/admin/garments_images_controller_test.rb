require 'test_helper'

class Admin::GarmentsImagesControllerTest < ActionDispatch::IntegrationTest
  test "should get edit" do
    get admin_garments_images_edit_url
    assert_response :success
  end

  test "should get update" do
    get admin_garments_images_update_url
    assert_response :success
  end

end
