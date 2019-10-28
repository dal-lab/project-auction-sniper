# Auction Sniper

## Generate TypeScript definitions for CodeceptJS

<https://codecept.io/commands#typescript-definitions>

```bash
mkdir ./tests/typings
npx codeceptjs def --output ./tests/typings
```

## Write `.env` file

```properties
PUSHER_APP_ID=<Your Application ID>
PUSHER_KEY=<Your Pusher Key>
PUSHER_SECRET=<Your Pusher Secret>
PUSHER_CLUSTER=<Your Pusher Cluster>
PUSHER_AUTH_ENDPOINT=http://localhost:5000/pusher/auth
PUSHER_CHANNEL_ID=auction-channel
```

## Run tests

### E2E Test

```bash
npm run pusher

# in a new tab
npm start

# in a new tab
npm test -- --verbose
```

### Unit Test

```bash
npm run pusher

# in a new tab
npx jest
```
