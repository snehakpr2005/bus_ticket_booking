import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.header.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "no token provided" });
    }

    const token = authHeader.split("")[1];
    try {

        const decoded = jwt.verify(token, process.env.jwt_secret);
        req.user = {
            id: decoded.id,
            role: decoded.role,
        };

        next();

    }
    catch (error) {
        res.status(401).json({ message: "invalid token" });

    }
}