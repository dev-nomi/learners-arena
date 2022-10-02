class CreateCourses < ActiveRecord::Migration[6.1]
  def change
    create_table :courses do |t|
      t.string :display_name
      t.string :description
      
      t.timestamps
    end
  end
end
