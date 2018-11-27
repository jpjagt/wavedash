class Tap < ApplicationRecord
  def increase!
    self.taps += 1
    self.save
  end
end
