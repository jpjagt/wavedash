module ColorHelper
  def hex2rgb(hex)
    hex[-6..].scan(/../).map {|color| color.to_i(16)}
  end

  def sort_rgb_by_luminosity(rgbs)
    rgbs.sort_by { |rgb| rgb.sum }
  end
end
