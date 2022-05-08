package com.kagamiapps

import com.kagamiapps.plugins.*
import io.ktor.websocket.*

suspend fun processJoinGameMessage(player: Player, bytes: ByteArray) {
    println("Processing join game message")
    waitingPlayers += player
    with(player.pokemonIDs) {
        add(bytes[1])
        add(bytes[2])
        add(bytes[3])
    }

    if (waitingPlayers.size == 2) {
        val newGameId = getLowestAvailableGameId()
        println("Creating game $newGameId")
        val game = Game(waitingPlayers.first(), waitingPlayers.last(), newGameId)
        waitingPlayers.clear()
        games[newGameId] = game
        sendOpponentJoinedMessages(game)
    }
}

suspend fun sendOpponentJoinedMessages(game: Game) {
    println("Sending opponent joined messages")
    val message1 = byteArrayOf(
        1,
        game.player2.pokemonIDs[0],
        game.player2.pokemonIDs[1],
        game.player2.pokemonIDs[2],
        game.id.toByte(),
        1,
    )
    game.player1.session.send(Frame.Binary(true, message1))

    val message2 = byteArrayOf(
        1,
        game.player1.pokemonIDs[0],
        game.player1.pokemonIDs[1],
        game.player1.pokemonIDs[2],
        game.id.toByte(),
        0,
    )
    game.player2.session.send(Frame.Binary(true, message2))
}


suspend fun processAttackMessage(bytes: ByteArray) {
    val gameId = bytes[1].toInt()
    val game = games[gameId] ?: return
    val damage = bytes[2].toInt()
    val isGameWon = bytes[3].toInt() == 1
    val playerNumber = bytes[4].toInt()

    println("Processing attack message (damage = $damage, isGameWon = $isGameWon, playerNumber = $playerNumber, gameId = $gameId)")

    sendReceiveDamageMessage(if (playerNumber == 0) game.player1 else game.player2, damage)

    if (isGameWon) {
        games.remove(game.id)
    }
}

suspend fun sendReceiveDamageMessage(player: Player, amount: Int) {
    println("Sending receive damage message")
    val message = byteArrayOf(
        3,
        amount.toByte(),
    )

    player.session.send(Frame.Binary(true, message))
}

fun processReconnectMessage(player: Player, bytes: ByteArray) {
    val playerNumber = bytes[1].toInt()
    val gameId = bytes[2].toInt()
    val game = games[gameId] ?: return
    println("Processing reconnect message (playerNumber = $playerNumber, gameId = $gameId)")
    if (playerNumber == 0) {
        game.player1 = player
    } else {
        game.player2 = player
    }
}

