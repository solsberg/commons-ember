class ProfileQuestion < ActiveRecord::Base
  #avoid errors with column named 'type'
  self.inheritance_column = "not_sti"

  belongs_to :section
end
