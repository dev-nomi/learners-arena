# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_11_30_185423) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "assignments", force: :cascade do |t|
    t.string "display_name"
    t.string "description"
    t.integer "week_no"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id"
    t.bigint "course_id"
    t.index ["course_id"], name: "index_assignments_on_course_id"
    t.index ["user_id"], name: "index_assignments_on_user_id"
  end

  create_table "coupons", force: :cascade do |t|
    t.string "coupon_id"
    t.string "coupon_name"
    t.integer "price_off"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "courses", force: :cascade do |t|
    t.string "display_name"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id", null: false
    t.string "outline"
    t.integer "level"
    t.integer "total_hours"
    t.integer "total_weeks"
    t.boolean "draft", default: true
    t.float "progress_increment", default: 0.0
    t.bigint "payment_plan_id"
    t.boolean "bought", default: false
    t.index ["payment_plan_id"], name: "index_courses_on_payment_plan_id"
    t.index ["user_id"], name: "index_courses_on_user_id"
  end

  create_table "enrolled_courses", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "course_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.float "progress", default: 0.0
    t.index ["course_id"], name: "index_enrolled_courses_on_course_id"
    t.index ["user_id"], name: "index_enrolled_courses_on_user_id"
  end

  create_table "handouts", force: :cascade do |t|
    t.string "display_name"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "course_id"
    t.bigint "user_id"
    t.integer "week_no"
    t.index ["course_id"], name: "index_handouts_on_course_id"
    t.index ["user_id"], name: "index_handouts_on_user_id"
  end

  create_table "jwt_denylist", force: :cascade do |t|
    t.string "jti", null: false
    t.datetime "exp", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["jti"], name: "index_jwt_denylist_on_jti"
  end

  create_table "payment_plans", force: :cascade do |t|
    t.string "payment_id"
    t.string "payment_name"
    t.integer "payment_price"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "price_id"
  end

  create_table "questions", force: :cascade do |t|
    t.string "title"
    t.string "question_type"
    t.string "ans_key"
    t.json "options"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "quiz_id"
    t.bigint "assignment_id"
    t.index ["assignment_id"], name: "index_questions_on_assignment_id"
    t.index ["quiz_id"], name: "index_questions_on_quiz_id"
  end

  create_table "quizzes", force: :cascade do |t|
    t.string "display_name"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id"
    t.bigint "course_id"
    t.integer "week_no"
    t.index ["course_id"], name: "index_quizzes_on_course_id"
    t.index ["user_id"], name: "index_quizzes_on_user_id"
  end

  create_table "reference_links", force: :cascade do |t|
    t.string "display_name"
    t.string "description"
    t.string "url"
    t.integer "week_no"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id"
    t.bigint "course_id"
    t.index ["course_id"], name: "index_reference_links_on_course_id"
    t.index ["user_id"], name: "index_reference_links_on_user_id"
  end

  create_table "responses", force: :cascade do |t|
    t.text "title"
    t.integer "resp_type"
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_responses_on_user_id"
  end

  create_table "user_assignments", force: :cascade do |t|
    t.boolean "attempted", default: false
    t.boolean "submitted", default: false
    t.integer "status"
    t.integer "marks", default: 0
    t.text "ans_keys"
    t.bigint "user_id"
    t.bigint "assignment_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["assignment_id"], name: "index_user_assignments_on_assignment_id"
    t.index ["user_id"], name: "index_user_assignments_on_user_id"
  end

  create_table "user_quizzes", force: :cascade do |t|
    t.boolean "attempted", default: false
    t.integer "status"
    t.integer "marks", default: 0
    t.text "ans_keys"
    t.bigint "user_id"
    t.bigint "quiz_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "submitted", default: false
    t.index ["quiz_id"], name: "index_user_quizzes_on_quiz_id"
    t.index ["user_id"], name: "index_user_quizzes_on_user_id"
  end

  create_table "user_videos", force: :cascade do |t|
    t.boolean "viewed", default: false
    t.bigint "user_id"
    t.bigint "video_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_user_videos_on_user_id"
    t.index ["video_id"], name: "index_user_videos_on_video_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "role"
    t.string "last_name"
    t.string "first_name"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "videos", force: :cascade do |t|
    t.string "display_name"
    t.string "description"
    t.integer "week_no"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id"
    t.bigint "course_id"
    t.index ["course_id"], name: "index_videos_on_course_id"
    t.index ["user_id"], name: "index_videos_on_user_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "assignments", "courses"
  add_foreign_key "assignments", "users"
  add_foreign_key "courses", "payment_plans"
  add_foreign_key "courses", "users"
  add_foreign_key "handouts", "courses"
  add_foreign_key "handouts", "users"
  add_foreign_key "questions", "assignments"
  add_foreign_key "questions", "quizzes"
  add_foreign_key "quizzes", "courses"
  add_foreign_key "quizzes", "users"
  add_foreign_key "reference_links", "courses"
  add_foreign_key "reference_links", "users"
  add_foreign_key "videos", "courses"
  add_foreign_key "videos", "users"
end
