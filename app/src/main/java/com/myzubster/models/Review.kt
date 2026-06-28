package com.myzubster.models

import com.google.gson.annotations.SerializedName

data class Review(
    @SerializedName("id") val id: String? = null,
    val authorId: String,
    val targetUserId: String,
    val skillId: String,
    val rating: Int,
    val comment: String? = null,
    val createdAt: String? = null
)

data class CreateReviewRequest(
    val authorId: String,
    val targetUserId: String,
    val skillId: String,
    val rating: Int,
    val comment: String? = null
)
