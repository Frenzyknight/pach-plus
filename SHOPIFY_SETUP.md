# Shopify storefront setup (v1: one-time purchase)

This guide walks you through wiring a Shopify store to the pach+ site. The site already contains the integration code; you only need to provide the store, products, and credentials.

## 1. Create a development store

1. Sign up at <https://partners.shopify.com>.
2. From the Partner dashboard go to **Stores → Add store → Create development store**.
3. Pick "Create a store to test and build" and finish the wizard.
4. Set your store currency to **INR** under **Settings → General → Standards and formats**.

## 2. Create the four products

For each product below, in **Products → Add product**, set the **Handle** (URL slug) to match the slug on the right. The handle MUST match exactly — the storefront uses it to look the product up.

| Product name      | Handle           | Status    | Price (INR, 24 day pack) |
| ----------------- | ---------------- | --------- | ------------------------ |
| Happy Muscles     | `happy-muscles`  | Active    | 1499                     |
| Happy Hormones    | `happy-hormones` | Active    | 1499                     |
| Happy Gut         | `happy-gut`      | Active    | 1499                     |
| Happy Breathe     | `happy-breathe`  | **Draft** | 799                      |

> **Single variant per product.** Do **not** add a `Supply` option in Shopify. Each product has exactly one variant priced for a 24-day pack. The product detail page exposes a 24 / 48 / 72 day supply selector that simply multiplies the cart quantity (×1, ×2, ×3) — there is no separate SKU per supply length.

### Happy Breathe — coming soon

Set Happy Breathe's status to **Draft** AND add the tag `coming-soon` (Tags field on the product page). The site reads this tag to display the "Coming Soon / Notify Me" state.

### Product images

Upload each product's package photo (matches `/public/package*.png` in this repo). The site will use Shopify's CDN for product images going forward.

## 3. Create a Storefront API access token (Headless channel)

This is Shopify's [recommended path](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/getting-started) for custom storefronts. We use the **private** access token because all requests to the Storefront API happen server-side from Next.js (server actions, route handlers, server components).

1. **Install the Headless channel** from the [Shopify App Store](https://apps.shopify.com/headless) — search for "Headless" in your store admin or open the link directly. Click **Install**.
2. In your store admin, under **Sales channels**, click **Headless**.
3. Click **Create storefront** (or **Add storefront** if one already exists). Name it `pach-plus-storefront`.
4. Once created, the channel shows two access tokens. Copy the **Private access token** (do NOT use the public token — it's rate-limited per IP and meant for browser-only calls).
5. Beside **Storefront API permissions**, click **Edit** and enable at least:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_product_tags`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`

   Click **Save**.

> **Alternate path (legacy):** If you cannot install the Headless channel for any reason, you can still use the older **Settings → Apps and sales channels → Develop apps → Create an app → Storefront API integration** flow. The same scopes apply and the token works identically with the `X-Shopify-Storefront-Access-Token` header used in [`lib/shopify/index.ts`](lib/shopify/index.ts).

## 4. Set environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com

# RECOMMENDED — paste the PRIVATE access token from the Headless channel.
SHOPIFY_STOREFRONT_PRIVATE_TOKEN=<private access token>

# Leave blank when using the private token. Only fill if you ONLY have a public token.
# SHOPIFY_STOREFRONT_ACCESS_TOKEN=

SHOPIFY_REVALIDATION_SECRET=<any random string, e.g. `openssl rand -hex 32`>
```

> **Important:** the two token types use different request headers (`Shopify-Storefront-Private-Token` for private, `X-Shopify-Storefront-Access-Token` for public). The code in [`lib/shopify/index.ts`](lib/shopify/index.ts) picks the correct header based on which env var you set. If you put a private token into `SHOPIFY_STOREFRONT_ACCESS_TOKEN` (or vice-versa), every request will fail with an empty error from Shopify.

Restart the dev server (`npm run dev`) after setting these.

## 5. Set up the revalidation webhook (production only)

This makes Shopify product edits invalidate the Next.js cache without a redeploy. Webhooks are configured at the store level, not on the Headless channel.

1. In your store admin, go to **Settings → Notifications → Webhooks → Create webhook**.
2. Create three webhooks — one for each event — all pointing at the same URL:
   - **Event**: `Product creation`, `Product update`, `Product deletion`
   - **Format**: JSON
   - **URL**: `https://pach-plus.vercel.app/api/revalidate?secret=<SHOPIFY_REVALIDATION_SECRET>`
3. Skip this for local development — you'd need a tunnel like `ngrok` if you want webhooks locally.

## 6. Verify the integration

After env vars are set and the dev server is restarted:

1. Visit `/shop` — the four product cards should show real Shopify prices (Happy Breathe shows "Coming Soon").
2. Click **Shop Now** on any active product → product detail page loads.
3. Pick a supply (24 / 48 / 72 Day) → click **Add to Bag**. Picking 48 adds quantity 2 of the variant; picking 72 adds quantity 3.
4. The cart drawer slides in from the right with the line item showing the chosen quantity.
5. Click **Proceed to checkout** → redirected to Shopify-hosted checkout (`<your-store>.myshopify.com/cart/c/...`).

## What's deferred to v2

- **Subscribe & Save** (selling plans) — requires a Shopify subscription app (Shopify Subscriptions, Recharge).
- **Starter Kit bundle** — currently hidden in the shop grid; can be re-enabled as a real Shopify product later.
- **Notify Me email capture** for Happy Breathe — currently a button without a handler; wire to Klaviyo or Shopify customer signup later.
- **Customer accounts** / order history.
