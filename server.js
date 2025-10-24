import express from "express";
import cors from "cors";
import Stripe from "stripe";

const app = express();
app.use(cors());
app.use(express.json());

// Use environment variable for security
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_51SG03tImnxhK2hGwZCqIh5WOgl25Svmeca8WRl6IOYHjcR2zhyukisUXNN344JHzZ529Wyukyp2MfHs2rFSE10t900eTWtfoDz");

// ✅ Use Render's dynamic port OR fallback to 4242 for local use
const PORT = process.env.PORT || 4242;

// Create a checkout session
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { itemName, price } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: itemName || "SAVR Meal" },
            unit_amount: Math.round(price * 100) || 999,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // ✅ When deployed, use your live frontend URL
      success_url: `${req.headers.origin}/success.html`,
      cancel_url: `${req.headers.origin}/cancel.html`,
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Works locally and on Render
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
