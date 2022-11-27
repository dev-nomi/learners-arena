class CourseMailer < ApplicationMailer  
  def new_course_message(course)
    @course = course
    students_email = User.students.pluck(:email) 
    mail(to: students_email, subject: "Course enrollment")
  end
end
