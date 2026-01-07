import jwt from "jsonwebtoken";

// MUST MATCH JWT_SECRET in .env
const JWT_SECRET = process.env.JWT_SECRET;

const token = jwt.sign(
  {
    id: "64f000000000000000000001", // fake user id
    role: "admin"                  // change to "user" if needed
  },
  JWT_SECRET,
  {
    expiresIn: "7d"
  }
);

console.log("\nJWT TOKEN (copy this):\n");
console.log(token);
