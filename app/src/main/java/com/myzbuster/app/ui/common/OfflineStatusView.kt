package com.myzbuster.app.ui.common

import android.content.Context
import android.util.AttributeSet
import android.view.LayoutInflater
import android.widget.FrameLayout
import android.widget.TextView
import androidx.constraintlayout.widget.ConstraintLayout
import com.myzbuster.app.R
import com.myzbuster.app.utils.NetworkUtils

class OfflineStatusView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : FrameLayout(context, attrs, defStyleAttr) {
    
    private val statusText: TextView
    private val container: ConstraintLayout
    
    init {
        // Infla il layout
        LayoutInflater.from(context).inflate(R.layout.view_offline_status, this, true)
        
        statusText = findViewById(R.id.offline_status_text)
        container = findViewById(R.id.offline_status_container)
        
        updateStatus()
    }
    
    fun updateStatus() {
        val isOnline = NetworkUtils.isNetworkAvailable(context)
        
        if (isOnline) {
            container.visibility = GONE
        } else {
            container.visibility = VISIBLE
            statusText.text = "⚠️ Modalità Offline - I dati potrebbero non essere aggiornati"
        }
    }
    
    fun showSyncStatus(isSyncing: Boolean, lastSyncTime: Long?) {
        if (isSyncing) {
            statusText.text = "🔄 Sincronizzazione in corso..."
            container.visibility = VISIBLE
        } else if (lastSyncTime != null) {
            val minutes = (System.currentTimeMillis() - lastSyncTime) / (60 * 1000)
            if (minutes > 5) {
                statusText.text = "⚠️ Ultima sincronizzazione: $minutes minuti fa"
                container.visibility = VISIBLE
            } else {
                container.visibility = GONE
            }
        }
    }
}