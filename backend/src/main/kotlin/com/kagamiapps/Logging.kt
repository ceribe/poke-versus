package com.kagamiapps

fun log(message: String) {
    val time = java.time.LocalTime.now().format(java.time.format.DateTimeFormatter.ofPattern("HH:mm:ss"))
    println("[$time] $message")
}