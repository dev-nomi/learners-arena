# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

admin1 = User.create(
  first_name: 'Areef',
  last_name: 'Ahmad',
  email: 'areefahmad@gmail.com',
  password: 'areefahmad@gmail.com',
  password_confirmation: 'areefahmad@gmail.com',
  role: 'admin'
)

admin2 = User.create(
  first_name: 'Ahmed',
  last_name: 'Mumtaz',
  email: 'ahmedmumtaz@gmail.com',
  password: 'ahmedmumtaz@gmail.com',
  password_confirmation: 'ahmedmumtaz@gmail.com',
  role: 'admin'
)