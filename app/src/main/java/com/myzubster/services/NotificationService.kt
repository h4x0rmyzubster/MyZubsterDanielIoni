package com.myzubster.services

import android.Manifest
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import androidx.core.content.ContextCompat
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import com.myzubster.R
import com.myzubster.activities.PaymentActivity
import com.myzubster.network.NotificationApiService
import com.myzubster.ui.chat.ChatActivity
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch

class NotificationService : FirebaseMessagingService() {
    private val serviceScope = CoroutineScope(SupervisorJob() + Dispatchers.IO)

    override fun onNewToken(token: String) {
        super.onNewToken(token)
        android.util.Log.d(TAG, "FCM token aggiornato: $token")
        registerToken(token)
    }

    override fun onMessageReceived(message: RemoteMessage) {
        super.onMessageReceived(message)

        val type = message.data["type"] ?: "generic"
        val title = message.notification?.title
            ?: message.data["title"]
            ?: when (type) {
                TYPE_PAYMENT_CONFIRMED -> "Pagamento confermato"
                TYPE_MESSAGE_RECEIVED -> "Nuovo messaggio"
                else -> "MyZubster"
            }
        val body = message.notification?.body
            ?: message.data["body"]
            ?: "Hai una nuova notifica"

        showNotification(title, body, message.data)
    }

    private fun registerToken(token: String) {
        val userId = currentUserId()
        if (userId.isBlank()) return

        serviceScope.launch {
            runCatching { NotificationApiService().registerDeviceToken(userId, token) }
                .onFailure { error -> android.util.Log.w(TAG, "Registrazione token FCM fallita: ${error.message}") }
        }
    }

    private fun showNotification(title: String, body: String, data: Map<String, String>) {
        createNotificationChannel()

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU &&
            ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED
        ) {
            android.util.Log.w(TAG, "Permesso POST_NOTIFICATIONS non concesso; notifica non mostrata")
            return
        }

        val intent = targetIntent(data)
        val stableKey = data["paymentId"] ?: data["messageId"] ?: data["chatId"] ?: System.currentTimeMillis().toString()
        val pendingIntent = PendingIntent.getActivity(
            this,
            stableKey.hashCode(),
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        val notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setContentTitle(title)
            .setContentText(body)
            .setStyle(NotificationCompat.BigTextStyle().bigText(body))
            .setAutoCancel(true)
            .setContentIntent(pendingIntent)
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)
            .build()

        NotificationManagerCompat.from(this).notify(stableKey.hashCode(), notification)
    }

    private fun targetIntent(data: Map<String, String>): Intent {
        return when (data["type"]) {
            TYPE_PAYMENT_CONFIRMED -> Intent(this, PaymentActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
                data["paymentId"]?.let { putExtra(PaymentActivity.EXTRA_PAYMENT_ID, it) }
            }
            TYPE_MESSAGE_RECEIVED -> Intent(this, ChatActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
                data["senderId"]?.let { putExtra(ChatActivity.EXTRA_CONTACT_USER_ID, it) }
                data["chatId"]?.let { putExtra(ChatActivity.EXTRA_CHAT_ID, it) }
            }
            else -> Intent(this, ChatActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
            }
        }
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return
        val channel = NotificationChannel(
            CHANNEL_ID,
            "Notifiche MyZubster",
            NotificationManager.IMPORTANCE_DEFAULT
        ).apply {
            description = "Notifiche per pagamenti Monero, messaggi e aggiornamenti MyZubster"
        }
        val manager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        manager.createNotificationChannel(channel)
    }

    private fun currentUserId(): String = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
        .getString(KEY_USER_ID, "")
        .orEmpty()

    companion object {
        private const val TAG = "NotificationService"
        const val CHANNEL_ID = "myzubster_notifications"
        const val TYPE_PAYMENT_CONFIRMED = "payment_confirmed"
        const val TYPE_MESSAGE_RECEIVED = "message_received"
        private const val PREFS_NAME = "myzubster_notifications"
        private const val KEY_USER_ID = "user_id"
    }
}
