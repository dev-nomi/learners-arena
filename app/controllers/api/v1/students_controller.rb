class Api::V1::StudentsController < ApplicationController
  def show
    @student = User.find_by_id(params[:id])
    render json: @student
  end

  def toggle_active
    @student = User.find_by_id(params[:student_id])
    @student.update(active: !@student.active)

    render json: { status: @student.active }    
  end

  def update
    @user = User.find_by_id(params[:id])

    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
    def user_params
      params.require(:user).permit(:first_name, :last_name, :email)
    end
end