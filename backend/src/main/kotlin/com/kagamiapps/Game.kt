package com.kagamiapps

import java.util.*

data class Game(var player0: Player, var player1: Player, val id: Int)

val games: MutableMap<Int, Game> = Collections.synchronizedMap(HashMap())

fun getLowestAvailableGameId(): Int {
    for (id in 0..255) if (!games.containsKey(id)) return id
    throw IllegalStateException("Game count limit reached")
}

