class CouponMailer < ApplicationMailer
  def send_coupon(coupon_id)
    @coupon = Coupon.find_by(coupon_id: coupon_id)
    students_email = User.students.joins(:enrolled_courses)
                                  .where(enrolled_courses: {progress: 90..100})
                                  .distinct.pluck(:email) 
    mail(to: students_email, subject: "Discount Coupon")
  end
end
