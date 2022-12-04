class UserQuizSerializer < ActiveModel::Serializer
  attributes :id, :status, :marks, :attempted, :submitted, :course, :quiz

  belongs_to :quiz

  def course
    object.quiz.course
  end
end
