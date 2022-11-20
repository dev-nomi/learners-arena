class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :full_name

  has_many :user_assignments
  
  def full_name
    object.first_name + " " + object.last_name
  end
end
