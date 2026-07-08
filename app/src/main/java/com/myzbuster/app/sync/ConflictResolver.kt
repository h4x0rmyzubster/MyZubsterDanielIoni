package com.myzbuster.app.sync

import com.myzbuster.app.database.entities.*

object ConflictResolver {
    
    fun resolveUserConflict(local: CachedUser, server: Map<String, Any>): Boolean {
        val serverTimestamp = server["lastUpdated"] as? Long ?: 0
        return serverTimestamp > local.lastUpdated
    }
    
    fun resolveBookingConflict(local: CachedBooking, server: Map<String, Any>): Boolean {
        val serverTimestamp = server["lastUpdated"] as? Long ?: 0
        if (!local.isSynced) {
            return false
        }
        return serverTimestamp > local.lastUpdated
    }
    
    fun resolveQuoteConflict(local: CachedQuote, server: Map<String, Any>): Boolean {
        val serverTimestamp = server["lastUpdated"] as? Long ?: 0
        if (!local.isSynced) {
            return false
        }
        return serverTimestamp > local.lastUpdated
    }
    
    fun resolveNotificationConflict(local: CachedNotification, server: Map<String, Any>): Boolean {
        val serverTimestamp = server["createdAt"] as? Long ?: 0
        if (!local.isSynced) {
            return false
        }
        return serverTimestamp > local.createdAt
    }
}