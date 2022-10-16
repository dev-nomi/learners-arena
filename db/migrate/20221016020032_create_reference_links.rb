class CreateReferenceLinks < ActiveRecord::Migration[6.1]
  def change
    create_table :reference_links do |t|
      t.string  :display_name
      t.string  :description
      t.string  :url
      t.integer :week_no

      t.timestamps
    end
  end
end
