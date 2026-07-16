import User from "../model/User.js";
import { Webhook } from "svix";
import { createClerkClient } from "@clerk/backend";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

const clerkWebhooks = async (req, res) => {
  try {
    // Verify webhook signature
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    whook.verify(JSON.stringify(req.body), headers);

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const clerkUser = await clerkClient.users.getUser(data.id);

        const userData = {
          _id: clerkUser.id,
          username:
            `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
          email: clerkUser.emailAddresses[0]?.emailAddress || "",
          image: clerkUser.imageUrl,
        };

        await User.create(userData);
        console.log(" User Created:", clerkUser.id);

        break;
      }

      case "user.updated": {
        const clerkUser = await clerkClient.users.getUser(data.id);

        await User.findByIdAndUpdate(
          clerkUser.id,
          {
            username:
              `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
            email: clerkUser.emailAddresses[0]?.emailAddress || "",
            image: clerkUser.imageUrl,
          },
          { new: true }
        );

        console.log(" User Updated:", clerkUser.id);

        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        console.log(" User Deleted:", data.id);
        break;
      }

      default:
        console.log("Unhandled webhook event:", type);
        break;
    }

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(" Clerk Webhook Error:", error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default clerkWebhooks;