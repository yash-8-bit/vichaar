import jwt from "jsonwebtoken";
export const generateToken = (data: any) : string => {
  const token =  jwt.sign(data, process.env.JWT_KEY as string, {
    expiresIn: "1d",
  });
  return token;
};
