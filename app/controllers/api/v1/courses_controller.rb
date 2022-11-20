class Api::V1::CoursesController < ApplicationController
  def index
    @courses = current_user.courses.with_attached_image.order(created_at: :desc).includes(:students, :handouts, :quizzes, :user, :assignments, :videos, :reference_links)
    @draft_courses = current_user.courses.draft.with_attached_image.order(created_at: :desc).includes(:students, :handouts, :quizzes, :user, :assignments, :videos, :reference_links)
    render json: { courses: @courses, draft_courses: @draft_courses }
  end

  def show
    @course = Course.with_attached_image.find_by_id(params[:id])
    render json: @course, include: [:students, :handouts, :quizzes, :reference_links, :videos, :assignments]
  end

  def create
    @course = Course.new(course_params)
    @course.user = current_user
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

  def publish
    @course = Course.find_by_id(params[:id])
    resourses_count = @course.assignments.size + @course.quizzes.size + @course.videos.size
    progress_increment = (100 / resourses_count.to_f).round(2)
    
    @course.update(draft: false, progress_increment: progress_increment)
    render json: { message: 'Successfully publish the course.' }
  end

  private
    def course_params
      params.require(:course).permit(:display_name, :description, :image, :level, :total_hours, :outline, :total_weeks).select {|x,v| v.present?}
    end
end
