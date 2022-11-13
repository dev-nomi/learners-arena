class AssignmentSerializer < ActiveModel::Serializer
  attributes :id, :display_name, :description, :week_no
  
  belongs_to :course
  has_many :questions
end
