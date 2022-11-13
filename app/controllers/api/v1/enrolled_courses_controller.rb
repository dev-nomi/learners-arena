class Api::V1::EnrolledCoursesController < ApplicationController
  before_action :set_course, :set_user, only: [:enroll]

  def index
    enroll_courses = current_user.courses_enrolled
    render json: enroll_courses
  end

  def enroll
    enroll_course = EnrolledCourse.new(enroll_course_params)

    @course.quizzes.each do |quiz|
      todo_quiz = @user.user_quizzes.build(quiz_id: quiz.id, status: 'IN_PROGRESS')
      todo_quiz.save!
    end

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

    def set_course
      @course = Course.find_by_id(enroll_course_params[:course_id])
    end

    def set_user
      @user = User.find_by_id(enroll_course_params[:user_id])
    end
end