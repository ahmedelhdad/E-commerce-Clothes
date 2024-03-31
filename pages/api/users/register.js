import { createRouter } from "next-connect";
import db from "../../../utils/db"
import UserModel from '../../../models/User';
import bcrypt from 'bcryptjs'
const Router = createRouter()
import { signToken } from '../../../utils/Auth'

Router.post(async (req, res) => {
    const { email, password, name } = req.body
    await db.connect()

    const userOld = await UserModel.findOne({ email })
    if (userOld) {
        return res.json({ msg: 'The Account is not registered  ' })
    }
    const salt = await bcrypt.genSalt(10)
    const passwordHsah = await bcrypt.hashSync(password, salt)
    const newUser = new UserModel({
        name,
        email,
        password:passwordHsah
    })
    const user = await newUser.save()
    await db.disconnect()
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