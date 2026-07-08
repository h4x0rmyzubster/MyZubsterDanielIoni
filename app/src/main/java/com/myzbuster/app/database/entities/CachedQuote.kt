package com.myzbuster.app.database.entities

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "cached_quotes")
data class CachedQuote(
    @PrimaryKey
    val id: String,
    val bookingId: String,
    val professionalId: String,
    val amount: Double,
    val description: String,
    val status: String, // pending, accepted, rejected, expired
    val lastUpdated: Long = System.currentTimeMillis(),
    val isSynced: Boolean = true
) {
    companion object {
        fun fromMap(data: Map<String, Any>): CachedQuote {
            return CachedQuote(
                id = data["id"] as? String ?: "",
                bookingId = data["bookingId"] as? String ?: "",
                professionalId = data["professionalId"] as? String ?: "",
                amount = (data["amount"] as? Number)?.toDouble() ?: 0.0,
                description = data["description"] as? String ?: "",
                status = data["status"] as? String ?: "pending",
                isSynced = data["isSynced"] as? Boolean ?: true
            )
        }
        
        fun toMap(quote: CachedQuote): Map<String, Any> {
            return mapOf(
                "id" to quote.id,
                "bookingId" to quote.bookingId,
                "professionalId" to quote.professionalId,
                "amount" to quote.amount,
                "description" to quote.description,
                "status" to quote.status,
                "isSynced" to quote.isSynced
            )
        }
    }
}