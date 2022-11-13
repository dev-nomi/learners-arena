class UserVideo < ApplicationRecord
  validates :video, uniqueness: { scope: :user }

  belongs_to :user
  belongs_to :video

  before_create :progress_increment

  def progress_increment
    course = Course.find_by_id(self.video.course.id)
    enrolled_course = EnrolledCourse.find_by(course_id: course.id, user_id: user.id)
    
    enrolled_course.progress += course.progress_increment
    enrolled_course.save! 
  end
end