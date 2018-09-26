module ApplicationHelper
  def get_garment_path(garment)
    garment_path(garment.category.name, garment.path)
  end

  def count_slashes(path)
    return 0 if path == "/"
    path.scan(/\//).count
  end

  def line_to(*args, &block)
    current_slashes = count_slashes(request.env['PATH_INFO'])
    link_slashes = count_slashes(args[1])
    klass = %(line #{:back if link_slashes < current_slashes})

    args[2] = {} if args[2].nil?
    args[2][:class] = %(#{args[2][:class]} #{klass})

    link_to(*args, &block)
  end
end
