import jwt from "jsonwebtoken";
import db from "../../utils/db"
import UserModel from '../../models/User';



export const middleware = (req, res, next) => {
   
    const { authorization } = req.body.headers;
    if (authorization) {
        // Bearer xxx => xxx
        const token = authorization.slice(7, authorization.length);
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
          if (err) {
            res.status(401).send({ message: 'Token is not valid' });
          } else {
            req.user = decode;
            next();
          }
        });
      } else {
        res.status(401).send({ message: 'Token is not suppiled' });
      }

}


export const isAdmin = async (req, res, next) => {
    await db.connect()
    const {email} = req.user
    const user = await UserModel.findOne({ email })
    if (user.isAdmin) {
      next();
    } else {
      res.status(401).send({ message: 'User is not admin' });
    }
  };