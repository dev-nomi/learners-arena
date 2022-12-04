class Course < ApplicationRecord
  validates :display_name, :description, presence: true, uniqueness: { case_sensitive: false }
  validates :level, :outline, :total_hours, presence: true
  validates :image, {
    presence: true
  }

  delegate :payment_id, to: :payment_plan
  delegate :payment_price, to: :payment_plan
  delegate :price_id, to: :payment_plan

  enum level: [:beginner, :intermediate, :advanced]

  has_one_attached :image, dependent: :purge
  belongs_to :user
  belongs_to :payment_plan
  has_many :handouts, dependent: :destroy
  has_many :enrolled_courses, dependent: :destroy
  has_many :students, through: :enrolled_courses, source: :user
  has_many :quizzes, dependent: :destroy
  has_many :reference_links, dependent: :destroy
  has_many :videos, dependent: :destroy
  has_many :assignments, dependent: :destroy
  has_many :student_payments, dependent: :destroy
  has_many :payment_students, through: :student_payments, source: :user

  before_create :add_total_weeks

  scope :published, -> { where(draft: false) }
  scope :draft, -> { where(draft: true) }

  def add_total_weeks
    self.total_weeks = ( self.total_hours / 3.0 ).ceil 
  end
end