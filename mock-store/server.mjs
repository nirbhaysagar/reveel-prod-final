import express from "express";

const app = express();
const port = process.env.PORT || 4000;

const storeInfo = {
  name: "MockMart",
  tagline: "Your friendly neighbourhood test store",
  currency: "USD"
};

const products = [
  {
    id: "coffee-beans",
    name: "Single Origin Coffee Beans",
    description: "Freshly roasted Arabica beans sourced from Colombia.",
    price: 18.5,
    inStock: true,
    image: "/images/coffee.jpg",
    lastUpdated: "2025-02-12T10:00:00Z"
  },
  {
    id: "mechanical-keyboard",
    name: "Mechanical Keyboard",
    description: "Compact 65% mechanical keyboard with hot-swappable switches.",
    price: 129.99,
    inStock: true,
    image: "/images/keyboard.jpg",
    lastUpdated: "2025-02-10T16:30:00Z"
  },
  {
    id: "ceramic-mug",
    name: "Matte Ceramic Mug",
    description: "12oz matte black ceramic mug with ergonomic handle.",
    price: 14.25,
    inStock: false,
    image: "/images/mug.jpg",
    lastUpdated: "2025-02-11T08:15:00Z"
  }
];

const htmlTemplate = ({ title, body }) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <style>
      body {
        font-family: Arial, Helvetica, sans-serif;
        margin: 0 auto;
        max-width: 720px;
        padding: 2rem 1.5rem 4rem;
        background-color: #f7f7f7;
        color: #222;
      }

      header {
        text-align: center;
        margin-bottom: 2.5rem;
      }

      header h1 {
        font-size: 2.4rem;
        margin-bottom: 0.4rem;
      }

      header p {
        margin: 0;
        font-size: 1.1rem;
        color: #444;
      }

      .badge {
        display: inline-block;
        background: #0d9488;
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 999px;
        font-size: 0.8rem;
        margin-left: 0.75rem;
      }

      .product-card {
        background: white;
        padding: 1.5rem;
        border-radius: 12px;
        box-shadow: 0 14px 38px rgba(15, 23, 42, 0.08);
        margin-bottom: 1.5rem;
        position: relative;
      }

      .product-card h2 {
        margin-top: 0;
        margin-bottom: 0.75rem;
      }

      .product-card .price {
        font-size: 1.6rem;
        font-weight: 700;
        margin-bottom: 0.75rem;
        color: #047857;
      }

      .product-card .meta {
        font-size: 0.9rem;
        color: #6b7280;
      }

      .product-card-status {
        position: absolute;
        top: 1.5rem;
        right: 1.5rem;
        font-size: 0.9rem;
        font-weight: 600;
        color: #025d50;
        display: flex;
        align-items: center;
      }

      .product-card-status.out {
        color: #b91c1c;
      }

      footer {
        margin-top: 3rem;
        text-align: center;
        font-size: 0.9rem;
        color: #6b7280;
      }

      a.button {
        display: inline-block;
        padding: 0.7rem 1.2rem;
        border-radius: 8px;
        background: #2563eb;
        color: white;
        text-decoration: none;
        font-weight: 600;
        margin-right: 0.75rem;
      }

      a.button.secondary {
        background: transparent;
        border: 1px solid #2563eb;
        color: #2563eb;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
        margin-top: 3rem;
      }

      .mini-card {
        background: white;
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
      }

      .mini-card-title {
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 0.4rem;
      }

      .mini-card-value {
        font-size: 0.95rem;
        color: #374151;
      }
    </style>
  </head>
  <body>
    ${body}
  </body>
</html>`;

app.get("/", (req, res) => {
  const body = `
    <header>
      <h1>${storeInfo.name}</h1>
      <p>${storeInfo.tagline}</p>
      <div class="badge">${storeInfo.currency}</div>
    </header>
    ${products
      .map((product) => `
          <article class="product-card" data-product-id="${product.id}" data-last-updated="${product.lastUpdated}">
            <div class="product-card-status ${product.inStock ? "" : "out"}">
              ${product.inStock ? "In Stock" : "Out of Stock"}
            </div>
            <h2>${product.name}</h2>
            <p class="price">$${product.price.toFixed(2)}</p>
            <p>${product.description}</p>
            <p class="meta">Updated: ${new Date(product.lastUpdated).toLocaleString()}</p>
            <a class="button" href="/products/${product.id}">View product</a>
          </article>
        `)
      .join("")}
  `;

  res.send(
    htmlTemplate({
      title: "MockMart Storefront",
      body
    })
  );
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);

  if (!product) {
    return res.status(404).send(
      htmlTemplate({
        title: "Product Not Found",
        body: "<h1>404</h1><p>The requested product could not be found.</p>"
      })
    );
  }

  const priceHistory = [
    { date: "2025-02-01", price: product.price * 0.9 },
    { date: "2025-02-05", price: product.price * 1.05 },
    { date: "2025-02-10", price: product.price }
  ];

  const body = `
    <header>
      <h1>${product.name}</h1>
      <p>${product.description}</p>
    </header>

    <section class="product-card">
      <div class="product-card-status ${product.inStock ? "" : "out"}">
        ${product.inStock ? "In Stock" : "Out of Stock"}
      </div>
      <p class="price">$${product.price.toFixed(2)}</p>
      <p class="meta">Last updated: ${new Date(product.lastUpdated).toLocaleString()}</p>
      <p><strong>SKU:</strong> ${product.id.toUpperCase()}</p>
      <p><strong>Shipping:</strong> Free shipping on orders over $50.</p>
      <p><strong>Return policy:</strong> 30-day hassle-free returns.</p>

      <div class="grid">
        <div class="mini-card">
          <p class="mini-card-title">Price History</p>
          <div class="mini-card-value">
            ${priceHistory
              .map((entry) => `${entry.date}: $${entry.price.toFixed(2)}`)
              .join("<br />")}
          </div>
        </div>
        <div class="mini-card">
          <p class="mini-card-title">Inventory Details</p>
          <p class="mini-card-value">Status: ${product.inStock ? "Available" : "Backordered"}</p>
          <p class="mini-card-value">Next Restock: ${new Date(
            Date.now() + 1000 * 60 * 60 * 24 * 3
          ).toLocaleDateString()}</p>
        </div>
        <div class="mini-card">
          <p class="mini-card-title">Customer Insights</p>
          <p class="mini-card-value">Average Rating: 4.${Math.floor(Math.random() * 5)}</p>
          <p class="mini-card-value">Reviews in last 30 days: ${Math.floor(
            Math.random() * 120
          )}</p>
        </div>
      </div>

      <footer>
        <a class="button" href="/">Back to store</a>
        <a class="button secondary" href="/api/products/${product.id}">View JSON</a>
      </footer>
    </section>
  `;

  res.send(
    htmlTemplate({
      title: `${product.name} – MockMart`,
      body
    })
  );
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

app.listen(port, () => {
  console.log(`Mock store running at http://localhost:${port}`);
});