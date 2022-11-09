# Shopify Strapi Demo

This demo is a simple Strapi application that uses the [Shopify Strapi Plugin](https://github.com/shop3/strapi-plugin-shopify) to connect to a Shopify store.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) >= 14.19.1
- [npm](https://www.npmjs.com/get-npm) >= 6.9.0

## Installation

1. Clone the repository

```bash
git clone
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root of the project and add the following environment variables:

- `APP_KEYS` - A comma-separated list of keys for Strapi admin.
- `JWT_SECRET` - A secret for Strapi admin.
- `API_TOKEN_SALT` - A salt for generating API tokens.
- `ADMIN_JWT_SECRET` - A secret for generating API tokens.
- `HOST_NAME` - The hostname of the Strapi application.
- `SHOPIFY_API_KEY` - The API key of the Shopify application.
- `SHOPIFY_API_SECRET` - The API secret of the Shopify application.
- `SHOPIFY_SCOPES` - The scopes of the Shopify application.
- `SHOPIFY_APP_EMBEDDED` - Whether the Shopify application is embedded.
- `SHOPIFY_REDIRECT_URL` - The redirect URL of the Shopify application.
- `SHOPIFY_APP_NAME` - The name of the Shopify application.

4. Start the application

```bash
npm run develop
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
