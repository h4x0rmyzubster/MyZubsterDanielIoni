package com.myzubster.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ProgressBar
import android.widget.RatingBar
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.myzubster.R
import com.myzubster.adapters.ReviewAdapter
import com.myzubster.models.Review
import com.myzubster.network.ApiService
import kotlinx.coroutines.launch
import java.util.Locale

class ProfileFragment : Fragment() {
    private val apiService: ApiService by lazy { ApiService.create() }
    private lateinit var reviewAdapter: ReviewAdapter
    private lateinit var ratingBar: RatingBar
    private lateinit var ratingText: TextView
    private lateinit var emptyText: TextView
    private lateinit var progress: ProgressBar

    private val userId: String by lazy { requireArguments().getString(ARG_USER_ID).orEmpty() }
    private val userName: String by lazy { requireArguments().getString(ARG_USER_NAME).orEmpty() }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        return inflater.inflate(R.layout.fragment_profile, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        reviewAdapter = ReviewAdapter()
        ratingBar = view.findViewById(R.id.profileRatingBar)
        ratingText = view.findViewById(R.id.profileRatingText)
        emptyText = view.findViewById(R.id.profileReviewsEmptyText)
        progress = view.findViewById(R.id.profileReviewsProgress)

        view.findViewById<TextView>(R.id.profileNameText).text = userName.ifBlank { "Profilo utente" }
        view.findViewById<RecyclerView>(R.id.profileReviewsRecyclerView).apply {
            layoutManager = LinearLayoutManager(requireContext())
            adapter = reviewAdapter
        }

        loadReviews()
    }

    fun loadReviews() {
        if (!isAdded || userId.isBlank()) return
        setLoading(true)
        viewLifecycleOwner.lifecycleScope.launch {
            runCatching { apiService.getReviewsForUser(userId) }
                .onSuccess { reviews ->
                    setLoading(false)
                    bindReviews(reviews)
                }
                .onFailure { error ->
                    setLoading(false)
                    emptyText.visibility = View.VISIBLE
                    emptyText.text = error.message ?: "Errore caricamento recensioni"
                }
        }
    }

    private fun bindReviews(reviews: List<Review>) {
        reviewAdapter.submitList(reviews)
        emptyText.text = "Ancora nessuna recensione"
        emptyText.visibility = if (reviews.isEmpty()) View.VISIBLE else View.GONE

        if (reviews.isEmpty()) {
            ratingBar.rating = 0f
            ratingText.text = "Nessuna recensione"
            return
        }

        val average = reviews.map { it.rating }.average()
        ratingBar.rating = average.toFloat()
        ratingText.text = String.format(Locale.US, "%.1f (%d recensioni)", average, reviews.size)
    }

    private fun setLoading(loading: Boolean) {
        progress.visibility = if (loading) View.VISIBLE else View.GONE
    }

    companion object {
        private const val ARG_USER_ID = "arg_user_id"
        private const val ARG_USER_NAME = "arg_user_name"

        fun newInstance(userId: String, userName: String = ""): ProfileFragment {
            return ProfileFragment().apply {
                arguments = Bundle().apply {
                    putString(ARG_USER_ID, userId)
                    putString(ARG_USER_NAME, userName)
                }
            }
        }
    }
}
