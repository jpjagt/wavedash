module TunnelHelper
  def garment_hash(garment)
    # --tunnel-primary: #ff0000; --tunnel-background: #441133; --tunnel-text: #fff;
    case garment.slug
    when 'televeyeze-blue'
      {
        background: '#60D6F0',
        primary: '#E46335',
        text: '#0E3DAA'
      }
    when 'televeyeze-pink'
      {
        primary: '#E95873',
        # background: '#f2d4e7',
        background: '#9c162d',
        text: '#ffffff',
      }
    else
      {}
    end
  end

  def construct_svg_filter_rgb(garment)
    colors = garment_hash(garment).values_at(:background, :primary, :text).reject(&:nil?)
    colors_per_channel = sort_rgb_by_luminosity(colors.map { |c| hex2rgb(c).map { |ch| ch / 255.0 } }).reverse.transpose
    Hash[[:R, :G, :B].zip(colors_per_channel)]
  end

  def garment_style(garment)
    garment_hash(garment).map { |k, v| %(--tunnel-#{k}: #{v}) }.join(';')
  end
end
