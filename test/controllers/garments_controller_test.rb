require 'test_helper'

class GarmentsControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get garments_show_url
    assert_response :success
  end

end
