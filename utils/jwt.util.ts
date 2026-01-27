import jwt from "jsonwebtoken";

const JWT_KEY = process.env.JWT_KEY as string;

export const generateToken = (data: any): string => {
  try {
    const token =  jwt.sign(data, JWT_KEY, {
      expiresIn: "1d",
    });
    return token;
  } catch (err) {return ""}
};

export const verifyToken = <T>(token: string): T | null => {
  try {
    const decoded = jwt.verify(token, JWT_KEY);
    return decoded as T;
  } catch (err) {
    return null;
  }
};
