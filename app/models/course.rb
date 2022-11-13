class Course < ApplicationRecord
  validates :display_name, :description, presence: true, uniqueness: { case_sensitive: false }
  validates :level, :outline, :total_hours, presence: true
  validates :image, {
    presence: true
  }

  enum level: [:beginner, :intermediate, :advanced]

  has_one_attached :image
  belongs_to :user
  has_many :handouts, dependent: :destroy
  has_many :enrolled_courses, dependent: :destroy
  has_many :users, through: :enrolled_courses, source: :user
  has_many :quizzes, dependent: :destroy
  has_many :reference_links, dependent: :destroy
  has_many :videos, dependent: :destroy
  has_many :assignments, dependent: :destroy

  before_create :add_total_weeks

  scope :published, -> { where(draft: false) }
  scope :draft, -> { where(draft: true) }

  def add_total_weeks
    self.total_weeks = ( self.total_hours / 3.0 ).ceil 
  end
end