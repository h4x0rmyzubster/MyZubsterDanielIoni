package com.myzbuster.app.database.dao

import androidx.room.*
import com.myzbuster.app.database.entities.CachedNotification
import kotlinx.coroutines.flow.Flow

@Dao
interface NotificationDao {
    @Query("SELECT * FROM cached_notifications WHERE id = :notificationId")
    fun getNotification(notificationId: String): Flow<CachedNotification?>
    
    @Query("SELECT * FROM cached_notifications WHERE userId = :userId ORDER BY createdAt DESC")
    fun getNotificationsForUser(userId: String): Flow<List<CachedNotification>>
    
    @Query("SELECT * FROM cached_notifications WHERE userId = :userId AND isRead = 0")
    fun getUnreadNotifications(userId: String): Flow<List<CachedNotification>>
    
    @Query("SELECT COUNT(*) FROM cached_notifications WHERE userId = :userId AND isRead = 0")
    fun getUnreadCount(userId: String): Flow<Int>
    
    @Query("SELECT * FROM cached_notifications WHERE isSynced = 0")
    suspend fun getUnsyncedNotifications(): List<CachedNotification>
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertNotification(notification: CachedNotification)
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertNotifications(notifications: List<CachedNotification>)
    
    @Update
    suspend fun updateNotification(notification: CachedNotification)
    
    @Delete
    suspend fun deleteNotification(notification: CachedNotification)
    
    @Query("DELETE FROM cached_notifications")
    suspend fun deleteAllNotifications()
    
    @Query("UPDATE cached_notifications SET isRead = 1 WHERE id = :notificationId")
    suspend fun markAsRead(notificationId: String)
    
    @Query("UPDATE cached_notifications SET isRead = 1 WHERE userId = :userId")
    suspend fun markAllAsRead(userId: String)
    
    @Query("UPDATE cached_notifications SET isSynced = 1 WHERE id = :notificationId")
    suspend fun markAsSynced(notificationId: String)
}