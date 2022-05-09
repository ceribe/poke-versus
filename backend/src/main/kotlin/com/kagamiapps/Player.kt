package com.kagamiapps

import io.ktor.websocket.*
import java.util.*

data class Player(val session: DefaultWebSocketSession, val pokemonIDs: MutableList<Byte> = mutableListOf())

val waitingPlayers: MutableSet<Player> = Collections.synchronizedSet(LinkedHashSet<Player>())
