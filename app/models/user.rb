class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  validates :role, presence: true
  
  enum role: [:student, :teacher, :admin]
  has_many :courses
  has_many :handouts

  has_many :enrolled_courses
  has_many :courses_enrolled, through: :enrolled_courses, source: :course
end
