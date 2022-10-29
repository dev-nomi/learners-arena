class AddUserAndCourseToAssignments < ActiveRecord::Migration[6.1]
  def change
    add_reference :assignments, :user,   foreign_key: true
    add_reference :assignments, :course, foreign_key: true
  end
end
