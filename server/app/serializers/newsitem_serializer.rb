class NewsitemSerializer < ActiveModel::Serializer
  embed :ids, include: true
  attributes :id, :content
  attribute :updated_at, key: :timestamp
  has_one :user
end
