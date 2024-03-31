import { createRouter } from "next-connect";
import UserModel from '../../../../models/User';
import db from '../../../../utils/db'
import {middleware,isAdmin} from '../../middleware'
const router = createRouter()



router.use(middleware)
router.use(isAdmin)



router.post(async (req, res) => {

  await db.connect();
  const user = await UserModel.findById(req.body.id);
  if (user) {
    res.json(user)
  }
});

router.put(async (req, res) => {
  await db.connect();
  const user = await UserModel.findById(req.body.id);
  if (user) {
    user.isAdmin = req.body.isAdmin;
    await user.save();
    await db.disconnect();
    res.send({ message: 'User Updated Successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'User Not Found' });
  }
});


export default router.handler()