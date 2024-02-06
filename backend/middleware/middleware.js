import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  //GET THE USER FROM THE JWT TOKEN AND ADD IT TO THE REQ OBJECT
  const token = req.header("auth-token");
  if (!token)
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });

  //verify token
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    console.log(data, "Data");
    req.user = {id: data.id};
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }

};
