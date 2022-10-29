class QuizSerializer < ActiveModel::Serializer
  attributes :id, :display_name, :description

  belongs_to :course
  has_many :questions
end
