import stripe from "stripe";
import Booking from "../model/Booking.js";

//API to handle stripe webhooks

export const stripeWebhooks = async (request, response) => {
    //stripe gateway initialize
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const sig = request.headers['stripe-signature'];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (error) {
        response.status(400).send(`WEBHOOK ERROR : ${error.message}`)
        
    }

    //Handle the event
    if(event.type === "payment_intent.succeeded"){
        const paymentIntent = event.data.object;
        const paymentIntentId = paymentIntent.id;

        // getting session metadata
        const session = await stripeInstance.checkout.sessions.list({
            payment_intent: paymentIntentId,
        });

        const { bookingId } = session.data[0].metadata;
        //MARK Payment as paid
        await Booking.findByIdAndUpdate(bookingId, {isPaid: true, paymentMethod:"Stripe"})
    }else{
        console.error("unhandled event type:", event.type)
    }

    response.status(200).json({received:true})
    
}