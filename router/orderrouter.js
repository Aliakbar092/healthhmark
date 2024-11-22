const express = require('express');
const router = express.Router();
const Order = require('../models/ordermodel');  // Assuming you named your model file Order.js
const Animal = require('../models/animalmodel');
const stripe = require('stripe')('sk_test_51QLdrEP7zmoaCHhXdmRqJ7Ul6W1OLFaW3clCoM8FqEfa9R4fmKPRDVYiBBbkktBDmkEDNXxXSqdJ57roUTzGiqLo00VGDTDXdc');


router.post('/create-checkout-session', async (req, res) => {
    const { cart, amount } = req.body;  // Assuming cart is an array of cart items, each with _id and quantity

    try {
        // Update stock for each item in the cart before creating the session
        for (let item of cart) {
            const animal = await Animal.findById(item._id);  // Find the animal by ID

            if (animal) {
                // Decrease stock by the quantity purchased
                animal.stock -= item.quantity;

                // Ensure stock does not go below 0
                if (animal.stock < 0) {
                    animal.stock = 0;
                }

                // Save the updated stock value back to the database
                await animal.save();
            }
        }

        // Create a new checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: cart.map(item => ({
                price_data: {
                    currency: 'pkr',  // Change to your currency
                    product_data: {
                        name: item.name,  // Use the name from the cart item
                    },
                    unit_amount: item.price * 100,  // Convert price to cents
                },
                quantity: item.quantity,  // Use the quantity from the cart item
            })),
            mode: 'payment',
            success_url: 'http://localhost:5000/paymentcomplete',  // Change to your success URL
            cancel_url: 'http://localhost:3000/cancel',    // Change to your cancel URL
        });

        // Send the session ID to the frontend
        res.json({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating session:', error);
        res.status(500).send({ error: 'Failed to create checkout session' });
    }
});

// Fetch all orders (GET request)
router.get('/checkout', async (req, res) => {
    try {
        const orders = await Order.find(); // Fetches all orders from the database
        res.json(orders); // Sends the orders as JSON
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch orders.' });
    }
});



module.exports = router;
