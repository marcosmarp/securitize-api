# NestJS Ethereum Wallet Management Project

This project is a NestJS-based backend application for managing Ethereum wallets. The application provides simple CRUD operations to manage wallet addresses and includes additional functionality such as retrieving wallet information from Etherscan API and checking if the wallet has an old transaction (i.e., more than a year old). The application also includes exchange rate information with two fixed rows that can be updated.

# Prerequisites

To run this project, you need to have the following installed on your system:

- Node.js (v14.17.6 or higher)
- NPM (v6.14.15 or higher)

# Local Development

```
npm install
npm run start:dev
```

# API Docs

`/docs` endpoint provides Swagger API documentation.

# CI/CD

You can find the API live at [https://securitize-api.onrender.com](https://securitize-api.onrender.com). Please note that the API is hosted on a free tier and may take a few seconds to load.
