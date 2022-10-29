class Question < ApplicationRecord
  belongs_to :quiz, optional: true
  belongs_to :question, optional: true
end