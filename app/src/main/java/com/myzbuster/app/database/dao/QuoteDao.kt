package com.myzbuster.app.database.dao

import androidx.room.*
import com.myzbuster.app.database.entities.CachedQuote
import kotlinx.coroutines.flow.Flow

@Dao
interface QuoteDao {
    @Query("SELECT * FROM cached_quotes WHERE id = :quoteId")
    fun getQuote(quoteId: String): Flow<CachedQuote?>
    
    @Query("SELECT * FROM cached_quotes WHERE bookingId = :bookingId")
    fun getQuotesForBooking(bookingId: String): Flow<List<CachedQuote>>
    
    @Query("SELECT * FROM cached_quotes WHERE professionalId = :professionalId")
    fun getQuotesForProfessional(professionalId: String): Flow<List<CachedQuote>>
    
    @Query("SELECT * FROM cached_quotes WHERE isSynced = 0")
    suspend fun getUnsyncedQuotes(): List<CachedQuote>
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertQuote(quote: CachedQuote)
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertQuotes(quotes: List<CachedQuote>)
    
    @Update
    suspend fun updateQuote(quote: CachedQuote)
    
    @Delete
    suspend fun deleteQuote(quote: CachedQuote)
    
    @Query("DELETE FROM cached_quotes")
    suspend fun deleteAllQuotes()
    
    @Query("UPDATE cached_quotes SET isSynced = 1 WHERE id = :quoteId")
    suspend fun markAsSynced(quoteId: String)
}