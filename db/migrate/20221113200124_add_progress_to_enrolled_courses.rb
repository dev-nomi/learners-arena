class AddProgressToEnrolledCourses < ActiveRecord::Migration[6.1]
  def change
    add_column :enrolled_courses, :progress, :float, default: 0
  end
end
