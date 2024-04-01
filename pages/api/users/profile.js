import { createRouter } from "next-connect";
import db from "../../../utils/db"
import UserModel from '../../../models/User';
import bcrypt from 'bcryptjs'
const Router = createRouter()
import { signToken } from '../../../utils/Auth'
import {middleware} from '../middleware'

Router.use(middleware);

Router.post(async (req, res) => {
    const {  name, email, password } = req.body
    await db.connect()
    const user = await UserModel.findById(req.user._id)
    user.name = name

    const IsEmail = await UserModel.find({ email })
    if (IsEmail && password) {
      return  res.json({ msg: 'Error Email' })
    } else {
        user.email = email
    }
    const salt = await bcrypt.genSalt(10)
    const passwordHsah = await bcrypt.hashSync(password, salt)
    user.password = password
        ? passwordHsah
        : user.password;
    await user.save();
    await db.disconnect();
    const token = signToken(user)
    if (token) {
        return res.json({
            user: {
                token,
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            }
        })
    }
})


export default Router.handler()