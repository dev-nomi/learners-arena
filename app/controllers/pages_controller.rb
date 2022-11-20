class PagesController < ApplicationController
  def home
  end
  
  def index
    @courses = Course.published.with_attached_image.includes(:students, :handouts, :quizzes, :user, :assignments, :videos, :reference_links)
    render json: @courses 
  end
end
