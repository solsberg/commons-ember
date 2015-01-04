class ProfileResponseSerializer < ActiveModel::Serializer
  attributes :id, :text, :question_id
end
