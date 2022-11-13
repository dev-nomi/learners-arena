class AddProgressIncrementToCourses < ActiveRecord::Migration[6.1]
  def change
    add_column :courses, :progress_increment, :float, default: 0
  end
end
