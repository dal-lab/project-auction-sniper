# Auction Sniper

## Generate TypeScript definitions for CodeceptJS

<https://codecept.io/commands#typescript-definitions>

```bash
npx codeceptjs def --output ./tests/typings
```

## Write `.env` file

```properties
SENDBIRD_APP_ID=<Your Application ID>
SENDBIRD_CHANNEL_URL=<Your Channel URL>
```

## Run tests

```bash
npm test -- --verbose
```
