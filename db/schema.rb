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

ActiveRecord::Schema.define(version: 20180401141128) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "name", default: ""
    t.text "description", default: ""
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "garments", force: :cascade do |t|
    t.string "name", default: ""
    t.text "description", default: ""
    t.integer "euros", default: 0
    t.integer "cents", default: 0
    t.bigint "category_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_garments_on_category_id"
  end

  create_table "images", force: :cascade do |t|
    t.bigint "garment_id"
    t.string "src", default: ""
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["garment_id"], name: "index_images_on_garment_id"
  end

  add_foreign_key "garments", "categories"
  add_foreign_key "images", "garments"
end
