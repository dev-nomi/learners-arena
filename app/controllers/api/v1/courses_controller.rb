class Api::V1::CoursesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @courses = Course.all.with_attached_image.order(created_at: :desc)
    render json: @courses 
  end

  def show
    @course = Course.find_by_id(params[:id])
    render json: @course
  end

  def create
    @course = Course.new(course_params)

    if @course.save
      render json: @course   
    else
      render json: @course.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @course = Course.find_by_id(params[:id])

    if @course.update(course_params)
      render json: @course
    else
      render json: { message: 'Cannot update the course.' }
    end
  end

  def destroy
    @course = Course.find_by_id(params[:id])
    @course.destroy
    render json: { message: 'Successfully delete the course.' }
  end

  private
    def course_params
      params.require(:course).permit(:display_name, :description, :image).select {|x,v| v.present?}
    end
end
