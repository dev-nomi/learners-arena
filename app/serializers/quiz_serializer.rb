class QuizSerializer < ActiveModel::Serializer
  attributes :id, :display_name, :description

  belongs_to :course
end
