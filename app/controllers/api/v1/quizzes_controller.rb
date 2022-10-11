class Api::V1::QuizzesController < ApplicationController
  respond_to :json

  def index
    @quizzes = current_user.quizzes.all.order(created_at: :desc)
    render json: @quizzes 
  end

  def show
    @quiz = Quiz.find_by_id(params[:id])
    render json: @quiz
  end

  def create
    @quiz = Quiz.new(quiz_params)
    @quiz.user = current_user
    
    if @quiz.save
      render json: @quiz   
    else
      render json: @quiz.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @quiz = Quiz.find_by_id(params[:id])

    if @quiz.update(quiz_params)
      render json: @quiz
    else
      render json: { message: 'Cannot update the quiz.' }
    end
  end

  def destroy
    @quiz = Quiz.find_by_id(params[:id])
    @quiz.destroy
    render json: { message: 'Successfully delete the quiz.' }
  end

  private
    def quiz_params
      params.require(:quiz).permit(:display_name, :description, :course_id)
    end
end
