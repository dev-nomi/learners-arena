class Api::V1::UserQuizzesController < ApplicationController
  before_action :set_user_quiz, expect: [:index]

  def index
    @quizzes = current_user.user_quizzes
    render json: @quizzes
  end

  def attempt
    course = @user_quiz.course
    enrolled_course = EnrolledCourse.find_by(course_id: course.id, user_id: current_user.id)
    
    enrolled_course.progress += course.progress_increment
    enrolled_course.save! 

    @user_quiz.update(attempted: true) 
  end

  def submit
    @user_quiz.update(ans_keys: JSON.parse(params[:ansKeys]))

    correct_ans_keys = @user_quiz.quiz.questions.pluck(:ans_key)
    attempted_ans_keys = @user_quiz.ans_keys.map{ |ans_key| ans_key["ans"] }

    @user_quiz.update(
      marks: (correct_ans_keys & attempted_ans_keys).count * 2,
      status: 'checked',
      submitted: true
    )
  end

  private
    def set_user_quiz
      @user_quiz = UserQuiz.find_by_id(params[:id])
    end
end