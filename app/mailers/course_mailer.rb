class CourseMailer < ApplicationMailer  
  def new_course_message(course)
    @course = course
    students_email = User.students.pluck(:email) 
    mail(to: students_email, subject: "New Course registration")
  end

  def course_enrollment(course, user)
    @course = course
    @user = user
    mail(to: @user.email, subject: "Course Enrollment")
  end
end
