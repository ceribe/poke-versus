package com.kagamiapps

import io.ktor.server.engine.*
import io.ktor.server.netty.*
import com.kagamiapps.plugins.*
import io.ktor.server.application.*
import io.ktor.server.websocket.*
import java.time.Duration

fun main() {
    embeddedServer(Netty, port = 8128, host = "0.0.0.0") {
        install(WebSockets){
            pingPeriod = Duration.ofSeconds(15)
            timeout = Duration.ofSeconds(15)
            maxFrameSize = Long.MAX_VALUE
            masking = false
        }
        configureRouting()
    }.start(wait = true)
}
