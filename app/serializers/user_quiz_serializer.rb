class UserQuizSerializer < ActiveModel::Serializer
  attributes :id, :status, :marks, :attempted

  belongs_to :quiz
end
