package com.kagamiapps

import io.ktor.websocket.*

suspend fun processJoinGameMessage(player: Player, bytes: ByteArray) {
    waitingPlayers += player
    with(player.pokemonIDs) {
        clear()
        add(bytes[1])
        add(bytes[2])
        add(bytes[3])
    }
    log("Processing join game message. (Pokemon IDs: ${player.pokemonIDs})")

    var game: Game? = null
    synchronized(waitingPlayers) {
        if (waitingPlayers.size == 2) {
            val newGameId = getLowestAvailableGameId()
            log("Creating game. (Game ID: $newGameId)")
            game = Game(waitingPlayers.first(), waitingPlayers.last(), newGameId)
            waitingPlayers.clear()
            games[newGameId] = game!!
        }
    }
    game?.let { sendOpponentJoinedMessages(it) }
}

suspend fun sendOpponentJoinedMessages(game: Game) {
    fun composeOpponentJoinedMessage(player: Player, playerNumber: Int): ByteArray {
        return byteArrayOf(
            0x01,
            player.pokemonIDs[0],
            player.pokemonIDs[1],
            player.pokemonIDs[2],
            game.id.toByte(),
            playerNumber.toByte()
        )
    }

    log("Sending opponent joined messages to players. (Game ID: ${game.id})")

    val message1 = composeOpponentJoinedMessage(game.player1, 0)
    game.player0.session.send(Frame.Binary(true, message1))

    val message2 = composeOpponentJoinedMessage(game.player0, 1)
    game.player1.session.send(Frame.Binary(true, message2))
}


suspend fun processAttackMessage(bytes: ByteArray) {
    val gameId = bytes[1].toInt()
    val game = games[gameId] ?: return
    val damage = bytes[2].toUByte()
    val isGameWon = bytes[3].toInt() == 1
    val playerNumber = bytes[4].toInt()

    log("Processing attack message. (Damage: ${damage}, Is Game Won: $isGameWon, Player Number: $playerNumber, Game ID: $gameId)")

    sendReceiveDamageMessage(if (playerNumber == 1) game.player0 else game.player1, damage)

    if (isGameWon) {
        games.remove(game.id)
    }
}

suspend fun sendReceiveDamageMessage(player: Player, damageAmount: UByte) {
    log("Sending receive damage message. (Damage: ${damageAmount})")
    val message = byteArrayOf(3, damageAmount.toByte())

    player.session.send(Frame.Binary(true, message))
}

fun processReconnectMessage(player: Player, bytes: ByteArray) {
    val playerNumber = bytes[1].toInt()
    val gameId = bytes[2].toInt()
    val game = games[gameId] ?: return

    log("Processing reconnect message. (Player Number: $playerNumber, Game ID: $gameId)")

    if (playerNumber == 0) {
        game.player0 = player
    } else {
        game.player1 = player
    }
}

