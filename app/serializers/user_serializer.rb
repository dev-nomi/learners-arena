class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :full_name, :active, :last_name, :first_name

  has_many :user_assignments
  has_many :user_quizzes
  has_many :courses
  has_many :courses_enrolled

  def full_name
    object.first_name + " " + object.last_name
  end
end
