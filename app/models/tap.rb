class Tap < ApplicationRecord
  def increase!
    self.taps += 1
    self.save
  end

  def self.report
    all.order(taps: :desc).each { |t| puts "#{t.identifier}: #{t.taps}" }
  end
end
