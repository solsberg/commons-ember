class UserSerializer < ActiveModel::Serializer
  attributes :id, :uid, :email, :username, :fullname
end
