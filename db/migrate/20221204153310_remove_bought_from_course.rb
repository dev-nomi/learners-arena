class RemoveBoughtFromCourse < ActiveRecord::Migration[6.1]
  def change
    remove_column :courses, :bought, :boolean, {default: false}
  end
end
