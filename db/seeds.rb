categories = [
  # {
  #   name: "tees",
  #   description: "our shortsleeves"
  # },
  # {
  #   name: "sweatshirts",
  #   description: "how can you be burr?"
  # },
  # {
  #   name: "hoodies",
  #   description: "bringers of comfort"
  # }
  {
    name: 'socks',
    description: 'the wavedash socks'
  }
]

categories.each do |category|
  Category.create!(category) unless Category.exists?(name: category[:name])
end

artists = [
  {
    name: 'marina mora',
    instagram: 'marinamora98'
  }
]

artists.each do |artist|
  Artist.create!(artist) unless Artist.exists?(name: artist[:name])
end

garments = [
  {
    name: 'televeyeze pink',
    description: 'our first sock, in pink',
    euros: 9,
    cents: 99,
    category_id: Category.find_by_name('socks').id,
    artist_id: Artist.find_by_name('Marina Mora').id
  },
  {
    name: 'televeyeze blue',
    description: 'our first sock, in blue',
    euros: 9,
    cents: 99,
    category_id: Category.find_by_name('socks').id
    artist_id: Artist.find_by_name('Marina Mora').id
  }
]

garments.each do |garment|
  Garment.create!(garment) unless Garment.exists?(name: garment[:name])
end

statuses = [
  {
    text: "browsing"
  },
  {
    text: "address entered"
  },
  {
    text: "paid"
  },
  {
    text: "delivering"
  },
  {
    text: "completed"
  },
]

statuses.each do |status|
  Status.create(status) unless Status.exists?(text: status[:text])
end
