package com.kagamiapps.plugins

import com.kagamiapps.Player
import com.kagamiapps.processAttackMessage
import com.kagamiapps.processJoinGameMessage
import com.kagamiapps.processReconnectMessage
import io.ktor.server.application.*
import io.ktor.server.routing.*
import io.ktor.server.websocket.*
import io.ktor.websocket.*

fun Application.configureRouting() {
    routing {
        webSocket("/pv") {
            val player = Player(this)
            for (frame in incoming) {
                when (frame) {
                    is Frame.Binary -> {
                        val bytes = frame.readBytes()
                        when (bytes[0].toInt()) {
                            0 -> processJoinGameMessage(player, bytes)
                            2 -> processAttackMessage(bytes)
                            4 -> processReconnectMessage(player, bytes)
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
