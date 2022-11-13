class QuizSerializer < ActiveModel::Serializer
  attributes :id, :display_name, :description, :todo_quiz, :week_no

  belongs_to :course
  has_many :questions

  def todo_quiz 
    object.user_quizzes.where(quiz_id: object.id).
                        select(:id, :attempted, :status, :marks, :ans_keys).first
  end
end
