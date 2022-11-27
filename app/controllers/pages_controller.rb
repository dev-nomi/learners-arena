class PagesController < ApplicationController
  def home
  end
  
  def index
    @courses = Course.all.with_attached_image.includes(:students, :handouts, :quizzes, :user, :assignments, :videos, :reference_links)
    render json: @courses 
  end

  def students
    @students = User.students
    render json: @students
  end

  def teachers
    @teachers = User.teachers
    render json: @teachers
  end
end
