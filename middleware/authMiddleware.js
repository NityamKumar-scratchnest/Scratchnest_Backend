import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "No token, access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();

  } catch (err) {
    if (err.name === "TokenExpiredError") {
     
      const expiredPayload = jwt.decode(token);

      const newAccessToken = jwt.sign(
        { id: expiredPayload.id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "New access token generated",
        accessToken: newAccessToken
      });
    }

    return res.status(401).json({ message: "Invalid token" });
  }
};
