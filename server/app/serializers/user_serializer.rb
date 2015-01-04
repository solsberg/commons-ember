class UserSerializer < ActiveModel::Serializer
  embed :ids, include: false
  attributes :id, :uid, :email, :username, :fullname
  has_many :profile_responses
end
