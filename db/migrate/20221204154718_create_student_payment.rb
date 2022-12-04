class CreateStudentPayment < ActiveRecord::Migration[6.1]
  def change
    create_table :student_payments do |t|
      t.belongs_to :user
      t.belongs_to :course
      t.boolean :bought, default: false
      
      t.timestamps
    end
  end
end
