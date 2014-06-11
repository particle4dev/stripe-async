var path = Npm.require('path');
var Future = Npm.require(path.join('fibers', 'future'));
//console.log(Stripe);

/**
var stripeToken = request.body.stripeToken;

var charge = stripe.charges.create({
  amount: 1000, // amount in cents, again
  currency: "usd",
  card: stripeToken,
  description: "payinguser@example.com"
}, function(err, charge) {
  if (err && err.type === 'StripeCardError') {
    // The card has been declined
  }
});
*/