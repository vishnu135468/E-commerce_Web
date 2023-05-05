const stripe = require("stripe")("sk_test_51N3ewlSJTbl0LG6nOqVxjKgtaFFM6T1xussl7q2vHtP2CINgYVnDcXyZsiKRWptKFUpe6EuvPlZ8VIjVHeYcfClv00J5cGlwsZ");
const uuid = require("uuid/v1");

exports.makepayment = (req, res) => {
  const { products, token } = req.body;
  console.log("PRODUCTS", products);

  let amount = 0;
  products.map(p => {
    amount = amount + p.price;
  });
  const idempotencyKey = uuid();
  return stripe.customers
    .create({
      email: token.email,
      // source: token.id
    })
    .then(customer => {
      stripe.invoiceItems
        .create(
          {
            amount: amount * 100,
            customer: customer.id,
            currency: "inr",
            // receipt_email: token.email,
            description: `Purchased the product`,
            // shipping: {
            //   name: token.card.name,
            //   address: {
            //     line1: token.card.address_line1,
            //     line2: token.card.address_line2,
            //     city: token.card.address_city,
            //     country: token.card.address_country,
            //     postal_code: token.card.address_zip
            //   }
            // }
          },
          {
            idempotencyKey
          }
        )
        .then(result => {
          console.log(result)
          res.status(200).json(result);
        })
        .catch(err => console.log(err));
    })
    .catch(console.log("FAILED"));
};
