class Api::V1::AssignmentsController < ApplicationController
  respond_to :json

  #/api/v1/assignmnets get
  def index
    @assignments = current_user.assignments.all.order(created_at: :desc)
    render json: @assignments
  end

  #api/v1/assignmnets/1 get
  def show
    @assignment = Assignment.find_by_id(params[:id])
    render json: @assignment
  end

  #api/v1/assignmnets post
  def create
    @assignment = Assignment.new(assignment_params)
    @assignment.user = current_user
    @questions = JSON.parse(params[:questions])

    @questions.each do |question|
      @assignment.questions.build(question)
    end 

    if @assignment.save
      render json: @assignment   
    else
      render json: @assignment.errors.full_messages, status: :unprocessable_entity
    end
  end

  #api/v1/assignmnets/1 put/patch
  def update
    @assignment = Assignment.find_by_id(params[:id])

    if @assignment.update(assignment_params)
      render json: @assignment
    else
      render json: { message: 'Cannot update the assignment.' }
    end
  end

  #ap1/v1/assignmets/1 delete
  def destroy
    @assignment = Assignment.find_by_id(params[:id])
    @assignment.destroy
    render json: { message: 'Successfully delete the assignment.' }
  end

  private
    def assignment_params
      params.require(:assignment).permit(:display_name, :description, :course_id, :week_no)
    end
end