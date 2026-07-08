package com.myzbuster.app.database.entities

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "cached_notifications")
data class CachedNotification(
    @PrimaryKey
    val id: String,
    val userId: String,
    val title: String,
    val body: String,
    val type: String, // message, booking, quote, system
    val isRead: Boolean = false,
    val data: String?, // JSON extra data
    val createdAt: Long = System.currentTimeMillis(),
    val isSynced: Boolean = true
) {
    companion object {
        fun fromMap(data: Map<String, Any>): CachedNotification {
            return CachedNotification(
                id = data["id"] as? String ?: "",
                userId = data["userId"] as? String ?: "",
                title = data["title"] as? String ?: "",
                body = data["body"] as? String ?: "",
                type = data["type"] as? String ?: "system",
                isRead = data["isRead"] as? Boolean ?: false,
                data = data["data"] as? String,
                isSynced = data["isSynced"] as? Boolean ?: true
            )
        }
        
        fun toMap(notification: CachedNotification): Map<String, Any> {
            return mapOf(
                "id" to notification.id,
                "userId" to notification.userId,
                "title" to notification.title,
                "body" to notification.body,
                "type" to notification.type,
                "isRead" to notification.isRead,
                "data" to (notification.data ?: ""),
                "isSynced" to notification.isSynced
            )
        }
    }
}