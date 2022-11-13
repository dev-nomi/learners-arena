class CreateUserVideos < ActiveRecord::Migration[6.1]
  def change
    create_table :user_videos do |t|
      t.boolean :viewed, default: false
      t.belongs_to :user
      t.belongs_to :video

      t.timestamps
    end
  end
end
