package com.kagamiapps.plugins

import com.kagamiapps.buildByteArray
import io.ktor.server.routing.*
import io.ktor.server.application.*
import io.ktor.server.websocket.*
import io.ktor.websocket.*
import java.util.*
import kotlin.collections.LinkedHashSet

data class Player(val session: DefaultWebSocketSession, val pokemonIDs: MutableList<Int> = mutableListOf())
data class Game(var player1: Player, var player2: Player, val id: Int)

val games: MutableMap<Int, Game> = Collections.synchronizedMap(HashMap())
val waitingPlayers: MutableSet<Player> = Collections.synchronizedSet(LinkedHashSet<Player>())

fun getLowestAvailableGameId(): Int {
    for (id in 0..7)
        if (!games.containsKey(id))
            return id
    throw IllegalStateException("No more games available")
}

class BitArray(byteArray: ByteArray) {

    private var value: Int = 0

    init {
        value = 0
        for (i in byteArray.indices) {
            value = value or (byteArray[i].toInt() shl 8 * i)
        }
    }

    fun getInt(startIndex: Int, length: Int): Int {
        var result = 0
        for (i in startIndex until startIndex + length) {
            result = result shl 1
            if ((value shr i and 1) == 1)
                result = result or 1
        }
        return result
    }
}

fun Application.configureRouting() {
    routing {
        webSocket("/pv") {
            val newPlayer = Player(this)
            for (frame in incoming) {
                when (frame) {
                    is Frame.Binary -> {
                        val bits = BitArray(frame.readBytes())
                        when (bits.getInt(0, 3)) {
                            0 -> processJoinGameMessage(newPlayer, bits)
                            2 -> processAttackMessage(newPlayer, bits)
                            4 -> processReconnectMessage(newPlayer, bits)
                        }
                    }
                    else -> {
                        println("Unhandled frame: $frame")
                    }
                }
            }
        }
    }
}

suspend fun processJoinGameMessage(player: Player, bits: BitArray) {
    waitingPlayers += player
    with (player.pokemonIDs) {
        add(bits.getInt(3, 5))
        add(bits.getInt(8, 5))
        add(bits.getInt(13, 5))
    }

    if (waitingPlayers.size == 2) {
        val newGameId = getLowestAvailableGameId()
        val game = Game(waitingPlayers.first(), waitingPlayers.last(), newGameId)
        waitingPlayers.clear()
        games[newGameId] = game
        sendOpponentJoinedMessages(game)

    }
}

suspend fun sendOpponentJoinedMessages(game: Game) {
    val message1 = buildByteArray {
        add(1, 1)
        add(game.id, 3)
        add(game.player2.pokemonIDs[2], 5)
        add(game.player2.pokemonIDs[1], 5)
        add(game.player2.pokemonIDs[0], 5)
        add(1,3)
    }
    game.player1.session.send(Frame.Binary(true, message1))

    val message2 = buildByteArray {
        add(0, 1)
        add(game.id, 3)
        add(game.player1.pokemonIDs[2], 5)
        add(game.player1.pokemonIDs[1], 5)
        add(game.player1.pokemonIDs[0], 5)
        add(1,3)
    }
    game.player2.session.send(Frame.Binary(true, message2))
}


fun processAttackMessage(player: Player, bits: BitArray) {

}

fun sendReceiveDamageMessage() {

}

fun processReconnectMessage(player: Player, bits: BitArray) {

}

