package com.myzbuster.app.database.entities

import androidx.room.Entity
import androidx.room.PrimaryKey
import com.google.gson.Gson

@Entity(tableName = "cached_bookings")
data class CachedBooking(
    @PrimaryKey
    val id: String,
    val clientId: String,
    val professionalId: String,
    val service: String,
    val category: String,
    val date: String,
    val time: String,
    val status: String, // pending, confirmed, in_progress, completed, cancelled
    val amount: Double?,
    val quoteId: String?,
    val notes: String?,
    val lastUpdated: Long = System.currentTimeMillis(),
    val isSynced: Boolean = true // true = sincronizzato con server
) {
    companion object {
        private val gson = Gson()
        
        fun fromMap(data: Map<String, Any>): CachedBooking {
            return CachedBooking(
                id = data["id"] as? String ?: "",
                clientId = data["clientId"] as? String ?: "",
                professionalId = data["professionalId"] as? String ?: "",
                service = data["service"] as? String ?: "",
                category = data["category"] as? String ?: "",
                date = data["date"] as? String ?: "",
                time = data["time"] as? String ?: "",
                status = data["status"] as? String ?: "pending",
                amount = (data["amount"] as? Number)?.toDouble(),
                quoteId = data["quoteId"] as? String,
                notes = data["notes"] as? String,
                isSynced = data["isSynced"] as? Boolean ?: true
            )
        }
        
        fun toMap(booking: CachedBooking): Map<String, Any> {
            return mapOf(
                "id" to booking.id,
                "clientId" to booking.clientId,
                "professionalId" to booking.professionalId,
                "service" to booking.service,
                "category" to booking.category,
                "date" to booking.date,
                "time" to booking.time,
                "status" to booking.status,
                "amount" to (booking.amount ?: 0.0),
                "quoteId" to (booking.quoteId ?: ""),
                "notes" to (booking.notes ?: ""),
                "isSynced" to booking.isSynced
            )
        }
    }
}