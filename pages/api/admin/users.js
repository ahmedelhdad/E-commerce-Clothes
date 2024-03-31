import { createRouter } from "next-connect";
import UserModel from '../../../models/User';
import db from '../../../utils/db'
import {middleware,isAdmin} from '../middleware'



const router = createRouter()


router.use(middleware)
router.use(isAdmin)
router.post(async (req, res) => {
    await db.connect();
    const users = await UserModel.find({})
    await db.disconnect();
    res.send(users);

})
router.put(async (req, res) => {
    await db.connect();
    const user = await UserModel.findById(req.body.id);
    if (user) {
      await user.deleteOne();
      const users = await UserModel.find()
      await db.disconnect();
      res.json({ message: 'User Deleted' ,users});
    } else {
      await db.disconnect();
      res.status(404).json({ message: 'User Not Found' });
    }
  });
export default router.handler()