import { createRouter } from "next-connect";
import db from "../../../utils/db"
import UserModel from '../../../models/User';
import bcrypt from 'bcryptjs'
const Router = createRouter()
import { signToken } from '../../../utils/Auth'

Router.post(async (req, res) => {
    const { email, password } = req.body
    await db.connect()
    try {
        var user = await UserModel.findOne({ email })
        await db.disconnect();
        if (!user) {
            return res.json({ msg: 'The Account is not registered  ' })
        }
        const isMatach = await bcrypt.compare(password, user.password)
        if (!isMatach) {
            return res.json({ msg: 'Error Password' })
        }
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
    } catch (err) {
        return res.status(401).json('erro')
    }



})


export default Router.handler()