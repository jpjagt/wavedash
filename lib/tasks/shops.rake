namespace :shops do
  desc 'import shops from JSON'
  task :import => [:environment] do |t, args|
    Shop.connection
    blacklist = [
      'icon', 'detailed_info_retrieved', 'business_status', 'address_components', 'adr_address', 'formatted_phone_number', 'utc_offset'
    ]
    file = File.open(Rails.root.join(args[:filename] || 'shops.json').to_s).read
    data = JSON.parse(file)
    data.each do |place_id, shop|
      Shop.create(name: shop['name'], gmaps_data: shop.except(blacklist))
    end
  end
end
