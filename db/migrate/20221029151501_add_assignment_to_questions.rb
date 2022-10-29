class AddAssignmentToQuestions < ActiveRecord::Migration[6.1]
  def change
    add_reference :questions, :assignment, foreign_key: true
  end
end
