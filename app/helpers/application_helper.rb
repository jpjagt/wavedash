module ApplicationHelper
  EMAIL = "hi@wavedash.club"

  def wavedashize(name = "wavedash")
    case rand(100)
    when 0..3
      %(~#{name}-)
    when 5..6
      %(/#{name}/)
    when 8
      %([#{name}])
    when 9
      name.reverse
    else
      name
    end
  end

  def get_garment_path(garment)
    garment_path(garment.category.name, garment.slug)
  end

  def currency(amount)
    number_to_currency(amount, unit: "€ ")
  end

  def count_slashes(path)
    return 0 if path == "/"
    path.scan(/\//).count
  end

  ALWAYS_FORWARD = [
    "/cart",
    "/contact"
  ]

  def line_to(*args, &block)
    next_path_index = block_given? ? 0 : 1
    options_index = next_path_index + 1

    current_slashes = count_slashes(request.env['PATH_INFO'])
    link_slashes = count_slashes(args[next_path_index])
    back = link_slashes < current_slashes && !ALWAYS_FORWARD.include?(args[next_path_index])
    classes = %(line #{:back if back})

    args[options_index] = {} if args[options_index].nil?
    args[options_index][:class] = %(#{args[options_index][:class]} #{classes})

    link_to(*args, &block)
  end

  def cart_count(count)
    count > 0 ? "(#{count})" : ""
  end
end
