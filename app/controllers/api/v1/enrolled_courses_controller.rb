class Api::V1::EnrolledCoursesController < ApplicationController
  before_action :set_course, :set_user, only: [:enroll]

  def index
    enroll_courses = current_user.courses_enrolled
    render json: enroll_courses
  end

  def enroll
    enroll_course = EnrolledCourse.new(enroll_course_params)

    if enroll_course.save
      @course.quizzes.each do |quiz|
        todo_quiz = @user.user_quizzes.create(quiz_id: quiz.id, status: 'in_progress')
      end

      @course.assignments.each do |assignment|
        todo_assignment = @user.user_assignments.create(assignment_id: assignment.id, status: 'in_progress')
      end

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