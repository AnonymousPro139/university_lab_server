import jwt from "jsonwebtoken";

// token olgoh
export const getJWT = (id, role, name) => {
    const token = jwt.sign(
      {
        id: id,
        role: role,
        name: name,
      },
      "ThisIsServerPasswordForTOKEN",
      {
        expiresIn: '24h',
      }
    );
  
    return token;
  };


  // token shalgah
  export const verifyJWT = (token) => {
    if (!token || token === "") {
      // throwUnauthenicated();
      return;
    }
  
    return jwt.verify(token, 'ThisIsServerPasswordForTOKEN');
  };