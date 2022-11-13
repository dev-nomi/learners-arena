class AddDraftToCourses < ActiveRecord::Migration[6.1]
  def change
    add_column :courses, :draft, :boolean, default: true
  end
end
