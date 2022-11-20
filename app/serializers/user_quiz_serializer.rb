class UserQuizSerializer < ActiveModel::Serializer
  attributes :id, :status, :marks, :attempted, :submitted, :course

  belongs_to :quiz

  def course
    object.quiz.course
  end
end
