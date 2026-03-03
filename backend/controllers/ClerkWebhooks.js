import User from "../model/User.js";
import { Webhook } from "svix";

const ClerkWebhooks = async(req,res)=>{
    try {
        //create a svix instance with clerk webhook secret
        const whook= new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        //GETTING HEADERS
        const headers ={
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["timestamp"],
            "svix-signature":req.headers["svix-signature"]
        };

        // verify headers
        await whook.verify(JSON.stringify(req.body),headers)

        //getting data from request body
        const{data,type}= req.body

        const userData={
            _id:data.id, email:data.email_addresses[0].email_address,
             username: data.first_name+" "+ data.last_name, image: data.image_url,
        }

        //switch cases for different Events
        switch(type){
            case "User.created":{
                await User.create(userData);
                break;
            }
            case "User.updated":{
                await User.findByIdAndUpdate(data.id,userData);
                break;
            }
            case "User.deleted":{
                await User.findByIdAndDelete(data.id);
                break;
            }
            default:break;
        }
        res.json({success:true, message:"webhook recieved"})
        
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message});    
    }
}

export default ClerkWebhooks