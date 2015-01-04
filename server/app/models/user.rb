class User < ActiveRecord::Base
  include DeviseTokenAuth::Concerns::User
  before_create :skip_confirmation!

  has_many :profile_responses

  scope :uid, -> (uid) { where uid: uid }
end
