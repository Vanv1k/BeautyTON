package handler

import (
	"encoding/json"
	"errors"
	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	er "github.com/Vanv1k/BeautyTON/internal/domain/errors"
	"github.com/Vanv1k/BeautyTON/internal/usecase"
	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"net/http"
)

type BookingHandler struct {
	usecase *usecase.BookingUsecase
}

func NewBookingHandler(usecase *usecase.BookingUsecase) *BookingHandler {
	return &BookingHandler{usecase: usecase}
}

func (h *BookingHandler) GetBooking(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	booking, err := h.usecase.GetBooking(r.Context(), id)
	if err != nil {
		if errors.Is(err, er.ErrRecordNotFound) {
			http.Error(w, "Booking not found", http.StatusNotFound)
		} else {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(booking)
}

func (h *BookingHandler) CreateBooking(w http.ResponseWriter, r *http.Request) {
	var booking entity.Booking
	if err := json.NewDecoder(r.Body).Decode(&booking); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	if err := h.usecase.CreateBooking(r.Context(), &booking); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(booking)
}

func (h *BookingHandler) UpdateBooking(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	var booking entity.Booking
	if err := json.NewDecoder(r.Body).Decode(&booking); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	booking.ID = id
	if err := h.usecase.UpdateBooking(r.Context(), &booking); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(booking)
}

func (h *BookingHandler) UpdateBookingStatus(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	var input struct {
		Status entity.BookingStatus `json:"status"`
	}
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	booking, err := h.usecase.UpdateBookingStatus(r.Context(), id, input.Status)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(booking)
}

func (h *BookingHandler) DeleteBooking(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	if err := h.usecase.DeleteBooking(r.Context(), id); err != nil {
		if errors.Is(err, er.ErrRecordNotFound) {
			http.Error(w, "Booking not found", http.StatusNotFound)
		} else {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
