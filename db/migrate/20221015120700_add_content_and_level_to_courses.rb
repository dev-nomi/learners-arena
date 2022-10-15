class AddContentAndLevelToCourses < ActiveRecord::Migration[6.1]
  def change
    add_column :courses, :outline,     :string
    add_column :courses, :level,       :integer
    add_column :courses, :total_hours, :integer
  end
end
