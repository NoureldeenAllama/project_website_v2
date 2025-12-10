import jwt from "jsonwebtoken";

// REMOVE the top-level const JWT_SECRET = ... line from here

export function authRequired(req, res, next) {
  const authHeader = req.headers.authorization || "";

  if (!authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization header missing or invalid" });
  }

  const token = authHeader.substring(7);

  try {
    // FIX: Read the secret HERE, inside the function
    // This ensures .env has finished loading before we try to use it
    const token_secret = process.env.JWT_SECRET; 
    
    const payload = jwt.verify(token, token_secret);
    
    req.user = {
      id: payload.id
    };
    
    next();
  } catch (err) {
    // Console log the error so you can see it in the terminal
    console.log("Token Verification Error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}