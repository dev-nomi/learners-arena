class Api::V1::TeachersController < ApplicationController
  def destroy
    @teacher = User.find_by_id(params[:id])
    @teacher.destroy

    render json: { message: 'Successully delete the teacher.' }    
  end
end