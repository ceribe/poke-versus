package com.kagamiapps

import io.ktor.utils.io.bits.*

@DslMarker
internal annotation class ByteArrayDsl

fun buildByteArray(block: ByteArrayBuilder.() -> Unit): ByteArray {
    val builder = ByteArrayBuilder()
    builder.block()
    return builder.build()
}

fun Int.reverseBits(length: Int): Int {
    var x = this
    var b = 0
    repeat(length) {
        b = b shl 1
        b = b or (x and 1)
        x = x shr 1
    }
    return b
}

@ByteArrayDsl
class ByteArrayBuilder {
    var currentValue = 0
    var totalLength = 0

    fun add(value: Int, size: Int) {
        totalLength += size
        if (totalLength > 32) {
            throw IllegalArgumentException("ByteArrayBuilder can only hold 4 bytes")
        }

        currentValue = currentValue shl size
        currentValue = currentValue or (value.reverseBits(size) and ((0xFFFFFFFF shr (32 - size)).toInt()))
    }

    fun build(): ByteArray {
        val result = ByteArray(4)
        result[0] = (currentValue shr 0).toByte()
        result[1] = (currentValue shr 8).toByte()
        result[2] = (currentValue shr 16).toByte()
        result[3] = (currentValue shr 24).toByte()
        return result
    }
}