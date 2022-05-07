package com.kagamiapps.plugins

import com.kagamiapps.*
import io.ktor.server.routing.*
import io.ktor.server.application.*
import io.ktor.server.websocket.*
import io.ktor.websocket.*
import java.util.*
import kotlin.collections.LinkedHashSet

data class Player(val session: DefaultWebSocketSession, val pokemonIDs: MutableList<Byte> = mutableListOf())
data class Game(var player1: Player, var player2: Player, val id: Int)

val games: MutableMap<Int, Game> = Collections.synchronizedMap(HashMap())
val waitingPlayers: MutableSet<Player> = Collections.synchronizedSet(LinkedHashSet<Player>())

fun getLowestAvailableGameId(): Int {
    for (id in 0..255) if (!games.containsKey(id)) return id
    throw IllegalStateException("No more games available")
}

fun Application.configureRouting() {
    routing {
        webSocket("/pv") {
            val newPlayer = Player(this)
            for (frame in incoming) {
                when (frame) {
                    is Frame.Binary -> {
                        val bytes = frame.readBytes()
                        when (bytes[0].toInt()) {
                            0 -> processJoinGameMessage(newPlayer, bytes)
                            2 -> processAttackMessage(bytes)
                            4 -> processReconnectMessage(newPlayer, bytes)
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
