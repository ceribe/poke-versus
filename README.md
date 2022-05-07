# Poke-Versus

## How to run

Install dependecies

```bash
npm install
```

Run on local machine

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Communitcation protocol

### 1. Join game (type = 0)

Client sends this message after connecting to servers websocket. Message contains a list of chosen pokemon IDs.

| Bits  | Content           |
| ----- | ----------------- |
| 0     | Message type      |
| 1-5   | First pokemon ID  |
| 6-10  | Second pokemon ID |
| 10-14 | Third pokemon ID  |

### 2. Opponent joined (type = 1)

Server sends this message to both players provided they both sent "Join game" message first.
Message contains a list of their opponent's pokemon IDs. Game ID and a bit specifing which player goes first.

| Bits  | Content           |
| ----- | ----------------- |
| 0     | Message type      |
| 1-5   | First pokemon ID  |
| 6-10  | Second pokemon ID |
| 10-14 | Third pokemon ID  |
| 15    | Game ID           |
