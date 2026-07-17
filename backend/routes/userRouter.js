import express from  'express'
import { getUserData, storeRecentSearchedCities } from '../controllers/userController.js';
import { protect } from '../configs/authMiddleware.js';

const userRouter = express.Router();

userRouter.get('/',protect,getUserData);
userRouter.post('/store-recent-search',protect,storeRecentSearchedCities);
// userRouter.get("/test", (req,res)=>{

//     console.log("AUTH FUNCTION:", req.auth);

//     const auth = req.auth();

//     console.log("AUTH DATA:", auth);

//     res.json(auth);

// });




export default userRouter