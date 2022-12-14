class CourseSerializer < ActiveModel::Serializer
  attributes :id, :display_name, :description, 
             :image, :level, :total_hours, :outline, :total_weeks, 
             :draft, :enrolled_course, :student_quizzes, :student_assignments,
             :teacher, :student_payment, :total_income

  has_many :handouts
  has_many :students
  has_many :quizzes
  has_many :reference_links
  has_many :videos
  has_many :assignments

  belongs_to :payment_plan

  def image
    if object.image.attached?
      Rails.application.routes.url_helpers.rails_blob_path(object.image, only_path: true)
    end
  end

  def enrolled_course
    return if current_user.nil?
    object.enrolled_courses.where(course_id: object.id, user_id: current_user.id).
                            select(:id, :progress).first
  end

  def student_payment
    return if current_user.nil?
    object.student_payments.where(course_id: object.id, user_id: current_user.id).
                            select(:id, :bought).first
  end

  def student_quizzes
    return if current_user.nil?
    current_user.user_quizzes.joins(:quiz).
                              where(quizzes: { course_id: object.id })
  end

  def student_assignments
    return if current_user.nil?
    current_user.user_assignments.joins(:assignment).
                                  where(assignments: { course_id: object.id })
  end

  def teacher
    object.user
  end

  def total_income
    price = (object.student_payments.count * object.payment_plan.payment_price / 2).to_s
    price.slice(0, price.length - 2) || 0
  end
end
