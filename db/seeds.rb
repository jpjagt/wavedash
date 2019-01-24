categories = [
  {
    name: "tees",
    description: "our shortsleeves"
  },
  {
    name: "sweatshirts",
    description: "how can you be burr?"
  },
  {
    name: "hoodies",
    description: "bringers of comfort"
  }
]

categories.each do |category|
  Category.create(category) unless Category.exists?(name: category[:name])
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
