class Api::V1::UserQuizzesController < ApplicationController
  def index
    @quizzes = current_user.user_quizzes
    render json: @quizzes
  end

  def attempt
    course = Course.find_by_id(params[:course_id])
    user_quiz = UserQuiz.find_by_id(params[:id])
    enrolled_course = EnrolledCourse.find_by(course_id: params[:course_id], user_id: current_user.id)
    
    enrolled_course.progress += course.progress_increment
    enrolled_course.save! 

    user_quiz.attempted = true
    user_quiz.save! 
  end

  def submit
    user_quiz = UserQuiz.find_by_id(params[:id])
    user_quiz.ans_keys = JSON.parse(params[:ansKeys])
    user_quiz.save! 
  end
end