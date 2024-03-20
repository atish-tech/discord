import jwt, { Secret } from "jsonwebtoken";

export const decodeToken = async (token: string) => {
    try {
        const secret: Secret = process.env.JWT_SECRET || ""; 

        return await jwt.verify(token, secret);
    } catch (error) {
        return false
    }
}