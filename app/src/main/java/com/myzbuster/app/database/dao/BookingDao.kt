package com.myzbuster.app.database.dao

import androidx.room.*
import com.myzbuster.app.database.entities.CachedBooking
import kotlinx.coroutines.flow.Flow

@Dao
interface BookingDao {
    @Query("SELECT * FROM cached_bookings WHERE id = :bookingId")
    fun getBooking(bookingId: String): Flow<CachedBooking?>
    
    @Query("SELECT * FROM cached_bookings WHERE clientId = :userId OR professionalId = :userId")
    fun getBookingsForUser(userId: String): Flow<List<CachedBooking>>
    
    @Query("SELECT * FROM cached_bookings WHERE status = :status")
    fun getBookingsByStatus(status: String): Flow<List<CachedBooking>>
    
    @Query("SELECT * FROM cached_bookings WHERE isSynced = 0")
    suspend fun getUnsyncedBookings(): List<CachedBooking>
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertBooking(booking: CachedBooking)
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertBookings(bookings: List<CachedBooking>)
    
    @Update
    suspend fun updateBooking(booking: CachedBooking)
    
    @Delete
    suspend fun deleteBooking(booking: CachedBooking)
    
    @Query("DELETE FROM cached_bookings")
    suspend fun deleteAllBookings()
    
    @Query("UPDATE cached_bookings SET isSynced = 1 WHERE id = :bookingId")
    suspend fun markAsSynced(bookingId: String)
}