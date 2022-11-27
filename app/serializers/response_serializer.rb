class ResponseSerializer < ActiveModel::Serializer
  attributes :id, :title, :resp_type

  belongs_to :user
end
