class ReferenceLinkSerializer < ActiveModel::Serializer
  attributes :id, :display_name, :description, :url, :week_no

  belongs_to :course
end
