package com.myzbuster.app.sync

import android.content.Context
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import com.myzbuster.app.database.entities.*
import com.myzbuster.app.repository.DataRepository
import com.myzbuster.app.utils.NetworkUtils

class SyncWorker(
    context: Context,
    params: WorkerParameters
) : CoroutineWorker(context, params) {
    
    private val dataRepository = DataRepository(context, com.myzbuster.app.cache.CacheManager(context))
    
    override suspend fun doWork(): Result {
        // Verifica connessione
        if (!NetworkUtils.isNetworkAvailable(applicationContext)) {
            return Result.retry()
        }
        
        return try {
            // Sincronizza tutti i dati pendenti
            syncBookings()
            syncQuotes()
            syncNotifications()
            
            Result.success()
        } catch (e: Exception) {
            Result.retry()
        }
    }
    
    private suspend fun syncBookings() {
        val unsynced = dataRepository.getUnsyncedBookings()
        for (booking in unsynced) {
            try {
                // TODO: Invia al server
                // val response = apiService.syncBooking(booking)
                // if (response.isSuccessful) {
                //     dataRepository.markBookingAsSynced(booking.id)
                // }
                
                // Per ora, segna come sincronizzato
                dataRepository.markBookingAsSynced(booking.id)
            } catch (e: Exception) {
                // Log errore
            }
        }
    }
    
    private suspend fun syncQuotes() {
        val unsynced = dataRepository.getUnsyncedQuotes()
        for (quote in unsynced) {
            try {
                // TODO: Invia al server
                dataRepository.markQuoteAsSynced(quote.id)
            } catch (e: Exception) {
                // Log errore
            }
        }
    }
    
    private suspend fun syncNotifications() {
        val unsynced = dataRepository.getUnsyncedNotifications()
        for (notification in unsynced) {
            try {
                // TODO: Invia al server
                dataRepository.markNotificationAsSynced(notification.id)
            } catch (e: Exception) {
                // Log errore
            }
        }
    }
}