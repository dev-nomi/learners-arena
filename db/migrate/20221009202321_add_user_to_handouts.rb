class AddUserToHandouts < ActiveRecord::Migration[6.1]
  def change
    add_reference :handouts, :user, foreign_key: true
  end
end
