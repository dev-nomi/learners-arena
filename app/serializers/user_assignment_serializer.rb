class UserAssignmentSerializer < ActiveModel::Serializer
  attributes :id, :status, :marks, :attempted, :submitted, :ans_keys, :course, :assignment, :user, :questions

  belongs_to :assignment
  belongs_to :user

  def course
    object.assignment.course
  end

  def questions
    object.assignment.questions
  end
end
