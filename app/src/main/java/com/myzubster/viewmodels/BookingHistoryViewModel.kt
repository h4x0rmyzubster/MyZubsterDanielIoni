package com.myzubster.viewmodels

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.myzubster.models.BookingHistory
import com.myzubster.repositories.BookingHistoryRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class BookingHistoryViewModel : ViewModel() {

    private val repository = BookingHistoryRepository()

    private val _bookingHistory = MutableStateFlow<List<BookingHistory>>(emptyList())
    val bookingHistory: StateFlow<List<BookingHistory>> = _bookingHistory.asStateFlow()

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow()

    private val _error = MutableStateFlow<String?>(null)
    val error: StateFlow<String?> = _error.asStateFlow()

    private val _pagination = MutableStateFlow<PaginationState?>(null)
    val pagination: StateFlow<PaginationState?> = _pagination.asStateFlow()

    private var currentPage = 1
    private var totalPages = 0
    private var currentUserId: String? = null
    private var currentStatus: String? = null

    data class PaginationState(
        val currentPage: Int,
        val totalPages: Int,
        val totalItems: Int,
        val itemsPerPage: Int
    )

    fun loadBookingHistory(
        userId: String,
        status: String? = null,
        page: Int = 1,
        limit: Int = 10
    ) {
        if (_isLoading.value) return

        currentUserId = userId
        currentStatus = status
        currentPage = page

        viewModelScope.launch {
            _isLoading.value = true
            _error.value = null

            try {
                val response = repository.getBookingHistory(
                    userId = userId,
                    page = page,
                    limit = limit,
                    status = status
                )

                if (response.isSuccessful && response.body()?.success == true) {
                    val body = response.body()
                    body?.let {
                        _bookingHistory.value = it.data
                        totalPages = if (it.pagination.total % it.pagination.limit == 0) {
                            it.pagination.total / it.pagination.limit
                        } else {
                            it.pagination.total / it.pagination.limit + 1
                        }
                        _pagination.value = PaginationState(
                            currentPage = it.pagination.page,
                            totalPages = totalPages,
                            totalItems = it.pagination.total,
                            itemsPerPage = it.pagination.limit
                        )
                    }
                } else {
                    _error.value = response.body()?.error ?: "Errore durante il caricamento"
                }
            } catch (e: Exception) {
                _error.value = e.message ?: "Errore di rete"
            } finally {
                _isLoading.value = false
            }
        }
    }

    fun loadNextPage() {
        if (currentPage < totalPages && !_isLoading.value) {
            currentUserId?.let { userId ->
                loadBookingHistory(
                    userId = userId,
                    status = currentStatus,
                    page = currentPage + 1
                )
            }
        }
    }

    fun loadPreviousPage() {
        if (currentPage > 1 && !_isLoading.value) {
            currentUserId?.let { userId ->
                loadBookingHistory(
                    userId = userId,
                    status = currentStatus,
                    page = currentPage - 1
                )
            }
        }
    }

    fun refresh(userId: String) {
        loadBookingHistory(userId, currentStatus, 1)
    }

    fun filterByStatus(userId: String, status: String) {
        loadBookingHistory(userId, status, 1)
    }

    fun clearFilters(userId: String) {
        currentStatus = null
        loadBookingHistory(userId, null, 1)
    }

    fun clearError() {
        _error.value = null
    }
}