class Api::V1::UserQuizzesController < ApplicationController
  def attempt
    user_quiz = UserQuiz.find_by_id(params[:id])
    user_quiz.attempted = true
    user_quiz.save! 
  end
end