class Api::V1::UserAssignmentsController < ApplicationController
  before_action :set_user_assignment, expect: [:index]

  def index
    @assignments = current_user.user_assignments
    render json: @assignments
  end

  def show    
    render json: @user_assignment
  end

  def attempt
    course = @user_assignment.course  
    enrolled_course = EnrolledCourse.find_by(course_id: course.id, user_id: current_user.id)
    
    enrolled_course.progress += course.progress_increment
    enrolled_course.save! 

    @user_assignment.update(attempted: true)
  end

  def submit    
    @user_assignment.update(
      ans_keys: JSON.parse(params[:ansKeys]), 
      submitted: true
    )
  end

  def check
    @user_assignment.update(
      marks: params[:marks], 
      status: 'checked'
    )
  end

  private
    def set_user_assignment
      @user_assignment = UserAssignment.find_by_id(params[:id])
    end
end