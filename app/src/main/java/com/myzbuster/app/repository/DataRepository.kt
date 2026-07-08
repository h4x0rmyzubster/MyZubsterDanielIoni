package com.myzbuster.app.repository

import android.content.Context
import com.myzbuster.app.cache.CacheManager
import com.myzbuster.app.cache.CacheValidity
import com.myzbuster.app.database.AppDatabase
import com.myzbuster.app.database.entities.*
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

class DataRepository(
    private val context: Context,
    private val cacheManager: CacheManager
) {
    
    private val database = AppDatabase.getInstance(context)
    
    // === BOOKING OPERATIONS ===
    suspend fun saveBooking(bookingData: Map<String, Any>) {
        val booking = CachedBooking.fromMap(bookingData)
        database.bookingDao().insertBooking(booking)
        
        cacheManager.put(
            key = "booking_${booking.id}",
            value = bookingData,
            validity = CacheValidity.MEDIUM_TERM
        )
    }
    
    suspend fun getBooking(bookingId: String): Map<String, Any>? {
        @Suppress("UNCHECKED_CAST")
        val cached = cacheManager.get("booking_$bookingId", Map::class.java) as? Map<String, Any>
        if (cached != null) return cached
        
        val dbBooking = database.bookingDao().getBooking(bookingId).map { it?.let { CachedBooking.toMap(it) } }
        return dbBooking as? Map<String, Any>
    }
    
    fun observeBookingsForUser(userId: String): Flow<List<Map<String, Any>>> {
        return database.bookingDao().getBookingsForUser(userId).map { bookings ->
            bookings.map { CachedBooking.toMap(it) }
        }
    }
    
    suspend fun getUnsyncedBookings(): List<CachedBooking> {
        return database.bookingDao().getUnsyncedBookings()
    }
    
    suspend fun markBookingAsSynced(bookingId: String) {
        database.bookingDao().markAsSynced(bookingId)
    }
    
    // === QUOTE OPERATIONS ===
    suspend fun saveQuote(quoteData: Map<String, Any>) {
        val quote = CachedQuote.fromMap(quoteData)
        database.quoteDao().insertQuote(quote)
        
        cacheManager.put(
            key = "quote_${quote.id}",
            value = quoteData,
            validity = CacheValidity.MEDIUM_TERM
        )
    }
    
    suspend fun getQuote(quoteId: String): Map<String, Any>? {
        @Suppress("UNCHECKED_CAST")
        val cached = cacheManager.get("quote_$quoteId", Map::class.java) as? Map<String, Any>
        if (cached != null) return cached
        
        val dbQuote = database.quoteDao().getQuote(quoteId).map { it?.let { CachedQuote.toMap(it) } }
        return dbQuote as? Map<String, Any>
    }
    
    fun observeQuotesForBooking(bookingId: String): Flow<List<Map<String, Any>>> {
        return database.quoteDao().getQuotesForBooking(bookingId).map { quotes ->
            quotes.map { CachedQuote.toMap(it) }
        }
    }
    
    suspend fun getUnsyncedQuotes(): List<CachedQuote> {
        return database.quoteDao().getUnsyncedQuotes()
    }
    
    suspend fun markQuoteAsSynced(quoteId: String) {
        database.quoteDao().markAsSynced(quoteId)
    }
    
    // === NOTIFICATION OPERATIONS ===
    suspend fun saveNotification(notificationData: Map<String, Any>) {
        val notification = CachedNotification.fromMap(notificationData)
        database.notificationDao().insertNotification(notification)
        
        cacheManager.put(
            key = "notification_${notification.id}",
            value = notificationData,
            validity = CacheValidity.SHORT_TERM
        )
    }
    
    suspend fun saveNotifications(notificationsData: List<Map<String, Any>>) {
        val notifications = notificationsData.map { CachedNotification.fromMap(it) }
        database.notificationDao().insertNotifications(notifications)
    }
    
    fun observeNotificationsForUser(userId: String): Flow<List<Map<String, Any>>> {
        return database.notificationDao().getNotificationsForUser(userId).map { notifications ->
            notifications.map { CachedNotification.toMap(it) }
        }
    }
    
    fun observeUnreadCount(userId: String): Flow<Int> {
        return database.notificationDao().getUnreadCount(userId)
    }
    
    suspend fun markNotificationAsRead(notificationId: String) {
        database.notificationDao().markAsRead(notificationId)
    }
    
    suspend fun markAllNotificationsAsRead(userId: String) {
        database.notificationDao().markAllAsRead(userId)
    }
    
    suspend fun getUnsyncedNotifications(): List<CachedNotification> {
        return database.notificationDao().getUnsyncedNotifications()
    }
    
    suspend fun markNotificationAsSynced(notificationId: String) {
        database.notificationDao().markAsSynced(notificationId)
    }
}