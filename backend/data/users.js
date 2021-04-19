import bcrypt from "bcryptjs"

const users = [
  {
    name: "Admin User",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("Admin123", 10),
    isAdmin: true
  },
  {
    name: "Bill Yengo",
    email: "bill@gmail.com",
    password: bcrypt.hashSync("Admin123", 10),
  },
  {
    name: "John Doe",
    email: "john@gmail.com",
    password: bcrypt.hashSync("Admin123", 10),
  },
]

export default users