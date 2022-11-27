class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  validates :role, :last_name, :first_name, presence: true
  
  scope :teachers, -> { where(role: 'teacher') }
  scope :students, -> { where(role: 'student') }

  enum role: [:student, :teacher, :admin]

  has_many :courses, dependent: :destroy
  has_many :handouts, dependent: :destroy
  has_many :enrolled_courses, dependent: :destroy
  has_many :courses_enrolled, through: :enrolled_courses, source: :course
  has_many :quizzes, dependent: :destroy
  has_many :reference_links, dependent: :destroy
  has_many :videos, dependent: :destroy
  has_many :assignments, dependent: :destroy
  has_many :user_quizzes, dependent: :destroy
  has_many :todo_quizzes, through: :user_quizzes, source: :quiz
  has_many :user_videos, dependent: :destroy
  has_many :videos_user, through: :user_videos, source: :video
  has_many :user_assignments, dependent: :destroy
  has_many :todo_assignments, through: :user_assignments, source: :assignment
  has_many :responses, dependent: :destroy
end
