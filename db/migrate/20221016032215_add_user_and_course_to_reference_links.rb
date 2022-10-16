class AddUserAndCourseToReferenceLinks < ActiveRecord::Migration[6.1]
  def change
    add_reference :reference_links, :user, foreign_key: true
    add_reference :reference_links, :course, foreign_key: true
  end
end
