package com.myzubster.ui.chat

import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.commit
import com.myzubster.R
import com.myzubster.fragments.PaymentFragment

class ChatActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_chat)

        findViewById<Button>(R.id.requestPaymentButton).setOnClickListener {
            requestPayment(amountXmr = "0.01", description = "Pagamento servizio MyZubster")
        }
    }

    private fun requestPayment(amountXmr: String, description: String) {
        supportFragmentManager.commit {
            replace(
                R.id.chatFragmentContainer,
                PaymentFragment.newInstance(
                    amount = amountXmr.toDoubleOrNull() ?: 0.01,
                    sellerId = "seller-demo",
                    description = description
                )
            )
            addToBackStack("payment")
        }
    }
}
