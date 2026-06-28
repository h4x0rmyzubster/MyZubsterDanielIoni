package com.myzubster.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.RatingBar
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.myzubster.R
import com.myzubster.models.Review
import java.time.OffsetDateTime
import java.time.format.DateTimeFormatter
import java.time.format.DateTimeParseException

class ReviewAdapter(
    private var reviews: List<Review> = emptyList()
) : RecyclerView.Adapter<ReviewAdapter.ReviewViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ReviewViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_review, parent, false)
        return ReviewViewHolder(view)
    }

    override fun onBindViewHolder(holder: ReviewViewHolder, position: Int) {
        holder.bind(reviews[position])
    }

    override fun getItemCount(): Int = reviews.size

    fun submitList(newReviews: List<Review>) {
        reviews = newReviews
        notifyDataSetChanged()
    }

    class ReviewViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val authorText: TextView = itemView.findViewById(R.id.reviewAuthorText)
        private val dateText: TextView = itemView.findViewById(R.id.reviewDateText)
        private val ratingBar: RatingBar = itemView.findViewById(R.id.reviewRatingBar)
        private val commentText: TextView = itemView.findViewById(R.id.reviewCommentText)

        fun bind(review: Review) {
            authorText.text = "Recensione di ${review.authorId}"
            dateText.text = formatDate(review.createdAt)
            ratingBar.rating = review.rating.toFloat()
            val comment = review.comment.orEmpty().trim()
            commentText.text = if (comment.isBlank()) "Nessun commento" else comment
            commentText.alpha = if (comment.isBlank()) 0.65f else 1f
        }

        private fun formatDate(value: String?): String {
            if (value.isNullOrBlank()) return ""
            return try {
                OffsetDateTime.parse(value).format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))
            } catch (_: DateTimeParseException) {
                value.take(10)
            }
        }
    }
}
