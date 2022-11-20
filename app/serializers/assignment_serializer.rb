class AssignmentSerializer < ActiveModel::Serializer
  attributes :id, :display_name, :description, :week_no, :todo_assignment
  
  belongs_to :course
  has_many :questions

  def todo_assignment 
    object.user_assignments.where(assignment_id: object.id).
                        select(:id, :attempted, :submitted, :status, :marks, :ans_keys).first
  end
end
