package com.myzubster.network

import com.myzubster.models.*
import retrofit2.Response
import retrofit2.http.*

interface ApiService {

    // ============ AUTH ============
    @POST("api/v1/auth/login")
    suspend fun login(
        @Body request: LoginRequest
    ): Response<AuthResponse>

    @POST("api/v1/auth/register")
    suspend fun register(
        @Body request: RegisterRequest
    ): Response<AuthResponse>

    // ============ BOOKINGS ============
    @GET("api/v1/bookings/history/{userId}")
    suspend fun getBookingHistory(
        @Path("userId") userId: String,
        @Query("page") page: Int = 1,
        @Query("limit") limit: Int = 10,
        @Query("status") status: String? = null
    ): Response<BookingHistoryResponse>

    // ============ PAYMENTS ============
    @POST("api/v1/payments")
    suspend fun createPayment(
        @Header("Authorization") token: String,
        @Body request: CreatePaymentRequest
    ): Response<PaymentResponse>

    @GET("api/v1/payments/{paymentId}/status")
    suspend fun checkPaymentStatus(
        @Path("paymentId") paymentId: String,
        @Header("Authorization") token: String
    ): Response<PaymentStatusResponse>

    // ============ SKILLS ============
    @GET("api/v1/skills")
    suspend fun getSkills(
        @Query("page") page: Int = 1,
        @Query("limit") limit: Int = 20
    ): Response<SkillsResponse>
}