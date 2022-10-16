class AddTotalWeeksToCoursesAndWeekNoToHandouts < ActiveRecord::Migration[6.1]
  def change
    add_column :courses,  :total_weeks, :integer
    add_column :handouts, :week_no,     :integer
    add_column :quizzes,  :week_no,     :integer
  end
end
