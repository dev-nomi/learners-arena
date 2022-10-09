class Api::V1::EnrolledCoursesController < ApplicationController
  def index
    enroll_courses = current_user.courses_enrolled
    render json: enroll_courses
  end

  def enroll
    enroll_course = EnrolledCourse.new(enroll_course_params)
    if enroll_course.save
      render json: enroll_course
    else
      render json: enroll_course.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
    def enroll_course_params
      params.require(:enroll_course).permit(:course_id, :user_id)
    end
end