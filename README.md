# Poke-Versus

## 1. How to run

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

## 2. Disclaimer

This implementation is extremely unsecure. There is no server side validation done so for the whole system to work
both players will have to play fair.

## 3. Communitcation protocol

### 3.1. Join Game (type = 0)

Client sends this message after connecting to server's websocket. Message contains a list of chosen pokemon IDs.

| Byte | Content           |
| ---- | ----------------- |
| 0    | Message type      |
| 1    | First pokemon ID  |
| 2    | Second pokemon ID |
| 3    | Third pokemon ID  |

### 3.2. Opponent Joined (type = 1)

Server sends this message to both clients provided they both sent "Join Game" message first.
Message contains a list of their opponent's pokemon IDs, game ID and a bit specifing which player goes first.

| Byte | Content            |
| ---- | ------------------ |
| 0    | Message type       |
| 1    | First pokemon ID   |
| 2    | Second pokemon ID  |
| 3    | Third pokemon ID   |
| 4    | Game ID            |
| 5    | 1 for first player |

### 3.3. Attack (type = 2)

Client sends this message to server when after chosing an attack.
Message contains amount of damage done and game ID. If this attack will
cause the player to win then last bit is set to 1. Basing on this server
will be able to clean up after game.

| Byte | Content          |
| ---- | ---------------- |
| 0    | Message type     |
| 1    | Game ID          |
| 2    | Amount of damage |
| 3    | Game won         |

### 3.4. Receive Damage (type = 3)

Server sends this message to client after receiving "Attack" message from it's opponent.
Message contains amount of damage done.

| Byte | Content          |
| ---- | ---------------- |
| 0    | Message type     |
| 1    | Amount of damage |
| 1    | Player Number    |

### 3.5. Reconnect (type = 4)

Clients sends this message to server after website is reloaded so server will update connection.
Player number is 0 for the player which started and 1 for the other one.

| Byte | Content       |
| ---- | ------------- |
| 0    | Message type  |
| 1    | Player Number |
