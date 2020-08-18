module ApplicationHelper
  EMAIL = "hi@wavedash.club"

  def in_admin_view?
    controller.class.parents.include?(Admin)
  end

  def cp(path)
    "current" if current_page?(path)
  end

  def wavedashize(name = "wavedash")
    case rand(100)
    when 0..1
      %(~#{name}-)
    when 5
      %(/#{name}/)
    when 8
      %([#{name}])
    when 9
      name.reverse
    else
      name
    end
  end

  def letterize(text)
    text.split('').map { |c| %(<span class="letter">#{c}</span>) }.join('').html_safe
  end

  def currency(amount)
    number_to_currency(amount, unit: "€ ")
  end

  def platform_as_class
    platform = browser.platform
    case
    when platform.mac?
      :mac
    when platform.windows?
      :windows
    end
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
