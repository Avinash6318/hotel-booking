import User from "../model/User.js";

//middleware to check if the user is authenticated
export const protect = async(req,res,next)=>{
   const { userId } = req.auth;

    console.log("userId:", userId);

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "not authenticated"
        });
    }

    const user = await User.findById(userId);

    console.log("user:", user);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found in database"
        });
    }

    req.user = user;
    next();
}