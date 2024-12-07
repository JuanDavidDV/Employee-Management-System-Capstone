import bcrypt from 'bcrypt';
const hashedPassword1 = await bcrypt.hash("password123", 10);
const hashedPassword2 = await bcrypt.hash("securepass456", 10);
const hashedPassword3 = await bcrypt.hash("helloworld123", 10);

export default [
  {
    name: "Bruce Wayne",
    image: "/images/batman.jpg",
    password: hashedPassword1,
    email: "bruce.wayne@email.com",
    category_id: 2,
    salary: 78000,
    address: "1234 Elm St"
  },
  {
    name: "Peter Parker",
    image: "/images/Spider-Man.jpg",
    password: hashedPassword2,
    email: "peter.parker@email.com",
    category_id: 2,
    salary: 110000,
    address: "5 Oak Ave"
  },
  {
    name: "Clark Kent",
    image: "/images/supermanavif.avif",
    password: hashedPassword3,
    email: "clark.kent@email.com",
    category_id: 3,
    salary: 150000,
    address: "9 Calle"
  }
]
