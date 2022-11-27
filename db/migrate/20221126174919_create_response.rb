class CreateResponse < ActiveRecord::Migration[6.1]
  def change
    create_table :responses do |t|
      t.text    :title
      t.integer :resp_type
      t.belongs_to :user
      
      t.timestamps
    end
  end
end
