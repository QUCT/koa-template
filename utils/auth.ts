import config from "../app/config";
import jwt from "jsonwebtoken";

const sign = (data: any) => {
  console.log("jwt", config.jwt);
  return jwt.sign(data, config.jwt.jwt_secret as string, {
    expiresIn: config.jwt.jwt_expire,
  });
};

const verify = (token: any) => {
  try {
    const decode = jwt.verify(token, config.jwt.jwt_secret as string);
    return {
      user: decode,
      error: null,
    };
  } catch (error) {
    return {
      user: null,
      error,
    };
  }
};

export { sign, verify };
