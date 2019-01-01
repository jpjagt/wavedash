require 'test_helper'

class Admin::GarmentsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get admin_garments_new_url
    assert_response :success
  end

  test "should get create" do
    get admin_garments_create_url
    assert_response :success
  end

  test "should get edit" do
    get admin_garments_edit_url
    assert_response :success
  end

  test "should get update" do
    get admin_garments_update_url
    assert_response :success
  end

end
