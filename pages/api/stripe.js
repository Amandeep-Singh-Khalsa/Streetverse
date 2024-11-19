import Stripe from 'stripe';

// Ensure that the Stripe secret key is available.
const stripeSecretKey = process.env.NEXT_SECRET_STRIPE_KEY;

if (!stripeSecretKey) {
  throw new Error('Stripe secret key is not defined in environment variables.');
}

const stripe = new Stripe(stripeSecretKey);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Ensure that the request body is correctly structured
      const { body } = req;
      if (!Array.isArray(body) || body.length === 0) {
        return res.status(400).json({ error: 'Invalid request body' });
      }

      // Create Checkout Sessions from body params.
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
          { shipping_rate: 'shr_1QMQ3yP6WtL12aN0lLafpKmm' },
          { shipping_rate: 'shr_1QMQ0dP6WtL12aN0yjvxRTmx' }
        ],
        line_items: body.map((item) => {
          if (!item.image || !item.image[0]?.asset?._ref) {
            throw new Error(`Invalid image reference for item: ${item.name}`);
          }

          const img = item.image[0].asset._ref;
          const newImage = img
            .replace('image-', 'https://cdn.sanity.io/images/dow10h3v/production/')
            .replace('-png', '.png');

          return {
            price_data: { 
              currency: 'usd',
              product_data: { 
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100, // Stripe expects the amount in cents
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/successPay`,
        cancel_url: `${req.headers.origin}/cart`,
      };

      // Create the checkout session
      const session = await stripe.checkout.sessions.create(params);

      // Return the session details
      res.status(200).json(session);
    } catch (err) {
      console.error('Stripe Checkout Session Error:', err); // Add logging for debugging
      res.status(err.statusCode || 500).json({ error: err.message });
    }
  } else {
    // Handle method not allowed
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
