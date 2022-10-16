class AddUserAndCourseToVideos < ActiveRecord::Migration[6.1]
  def change
    add_reference :videos, :user,   foreign_key: true
    add_reference :videos, :course, foreign_key: true
  end
end
