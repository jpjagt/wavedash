require 'test_helper'

class Admin::OrdersStatusesControllerTest < ActionDispatch::IntegrationTest
  test "should get update" do
    get admin_orders_statuses_update_url
    assert_response :success
  end

end
