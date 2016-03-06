# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160306140130) do

  create_table "newsitems", force: :cascade do |t|
    t.string   "content",    limit: 255
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "newsitems", ["user_id"], name: "index_newsitems_on_user_id"

  create_table "profile_questions", force: :cascade do |t|
    t.string   "text",        limit: 255
    t.string   "description", limit: 255
    t.string   "type",        limit: 255
    t.integer  "order"
    t.integer  "section_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "profile_questions", ["section_id"], name: "index_profile_questions_on_section_id"

  create_table "profile_responses", force: :cascade do |t|
    t.string   "text",        limit: 255
    t.integer  "user_id"
    t.integer  "question_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "profile_sections", force: :cascade do |t|
    t.string   "title",      limit: 255
    t.integer  "order"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: :cascade do |t|
    t.string   "provider",               limit: 255,              null: false
    t.string   "uid",                    limit: 255, default: "", null: false
    t.string   "encrypted_password",     limit: 255, default: ""
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                      default: 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.string   "confirmation_token",     limit: 255
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email",      limit: 255
    t.string   "username",               limit: 255
    t.string   "fullname",               limit: 255
    t.string   "image",                  limit: 255
    t.string   "email",                  limit: 255
    t.text     "tokens"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email"
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  add_index "users", ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true

end
