# Poké Versus

## 1. How to run

### 1.1 Frontend Server

#### 1.1.1 Enter "frontend" directory

#### 1.1.2 Install dependecies

```bash
npm install
```

#### 1.1.3 Run on local machine

```bash
npm run dev
```

### 1.2 Backend Server

Open project in Intellij IDEA and run

## 2. Disclaimer

This implementation is extremely unsecure. There is no server side validation done so for the whole system to work
both players will have to play fair.

## 3. Communitcation protocol

### 3.0 Values

| Name          | Meaning                                   | Possible Values |
| ------------- | ----------------------------------------- | --------------- |
| Message type  | Value specyfing which message was received | 0..4            |
| Pokemon ID    | Index specifying a species of pokemon     | 0..24           |
| Game ID       | Number used to differentiate games         | 0..255          |
| Player Number | Player with number 1 starts               | 0 or 1          |

### 3.1. Join Game Message (type = 0)

Client sends this message when he wants to start a game. Message contains a list of chosen pokemon IDs.

| Byte | Content           |
| ---- | ----------------- |
| 0    | Message type      |
| 1    | First pokemon ID  |
| 2    | Second pokemon ID |
| 3    | Third pokemon ID  |

### 3.2. Opponent Joined Message (type = 1)

Server sends this message to both clients provided they both sent "Join Game" message first.
Message contains a list of their opponent's pokemon IDs.

| Byte | Content            |
| ---- | ------------------ |
| 0    | Message type       |
| 1    | First pokemon ID   |
| 2    | Second pokemon ID  |
| 3    | Third pokemon ID   |
| 4    | Game ID            |
| 5    | Player Number      |

### 3.3. Attack Message (type = 2)

Client sends this message to server after chosing an attack. If this attack will
cause the player to win then Game Won byte is set to 1. Using this server
will be able to clean up after game.

| Byte | Content          |
| ---- | ---------------- |
| 0    | Message type     |
| 1    | Game ID          |
| 2    | Amount of damage |
| 3    | Game won         |
| 4    | Player Number    |

### 3.4. Receive Damage Message (type = 3)

Server sends this message to client after receiving "Attack" message from that player's opponent.

| Byte | Content          |
| ---- | ---------------- |
| 0    | Message type     |
| 1    | Amount of damage |

### 3.5. Reconnect Message (type = 4)

Clients sends this message to server after website is reloaded so server will update connection.

| Byte | Content       |
| ---- | ------------- |
| 0    | Message type  |
| 1    | Player Number |
| 2    | Game ID       |
