class AddCourseToHandouts < ActiveRecord::Migration[6.1]
  def change
    add_reference :handouts, :course, foreign_key: true
  end
end
