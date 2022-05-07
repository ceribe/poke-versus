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

### 1. Join Game (type = 0)

Client sends this message after connecting to servers websocket. Message contains a list of chosen pokemon IDs.

| Bits  | Bits Count | Content           |
| ----- | ---------- | ----------------- |
| 0-2   | 3          | Message type      |
| 3-8   | 6          | First pokemon ID  |
| 9-13  | 6          | Second pokemon ID |
| 14-18 | 6          | Third pokemon ID  |

### 2. Opponent Joined (type = 1)

Server sends this message to both players provided they both sent "Join game" message first.
Message contains a list of their opponent's pokemon IDs. Game ID and a bit specifing which player goes first.

| Bits  | Bits Count | Content            |
| ----- | ---------- | ------------------ |
| 0-2   | 3          | Message type       |
| 3-8   | 6          | First pokemon ID   |
| 9-13  | 6          | Second pokemon ID  |
| 14-18 | 6          | Third pokemon ID   |
| 19-21 | 3          | Game ID            |
| 22    | 1          | 1 for first player |

### 3. Attack (type = 2)

Client sends this message to server when after chosing an attack.
Message contains amount of damage done and game ID.

| Bits | Bits Count | Content          |
| ---- | ---------- | ---------------- |
| 0-2  | 3          | Message type     |
| 3-5  | 3          | Game ID          |
| 6-14 | 9          | Amount of damage |

### 4. Recive Damage (type = 3)

Server sends this message to client after receiving "Attack" message from it's opponent.
Message contains amount of damage done.

| Bits | Bits Count | Content          |
| ---- | ---------- | ---------------- |
| 0-2  | 3          | Message type     |
| 3-11 | 9          | Amount of damage |
