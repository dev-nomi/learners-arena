class CreateUserAssignments < ActiveRecord::Migration[6.1]
  def change
    create_table :user_assignments do |t|
      t.boolean :attempted, default: false
      t.boolean :submitted, default: false
      t.integer :status
      t.integer :marks, default: 0
      t.text    :ans_keys
      t.belongs_to :user
      t.belongs_to :assignment

      t.timestamps
    end
  end
end
