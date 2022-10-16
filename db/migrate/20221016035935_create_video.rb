class CreateVideo < ActiveRecord::Migration[6.1]
  def change
    create_table :videos do |t|
      t.string  :display_name
      t.string  :description
      t.integer :week_no
      
      t.timestamps
    end
  end
end
