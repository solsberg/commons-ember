class UserSerializer < ActiveModel::Serializer
  embed :ids, include: false
  attributes :id, :uid, :email, :username, :fullname, :links

  def links
    {:profile_responses => user_profile_responses_path(object)}
  end
end
