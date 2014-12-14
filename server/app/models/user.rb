class User < ActiveRecord::Base
  include DeviseTokenAuth::Concerns::User
  before_create :skip_confirmation!

  scope :uid, -> (uid) { where uid: uid }
end
