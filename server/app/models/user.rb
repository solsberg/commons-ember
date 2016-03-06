class User < ActiveRecord::Base
  has_many :profile_responses

  scope :uid, -> (uid) { where uid: uid }
end
