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

type PaymentHandler struct {
	usecase *usecase.PaymentUsecase
}

func NewPaymentHandler(usecase *usecase.PaymentUsecase) *PaymentHandler {
	return &PaymentHandler{usecase: usecase}
}

// GetPayment godoc
// @Summary Get a payment by ID
// @Description Get payment details by payment ID
// @Tags payments
// @Accept  json
// @Produce  json
// @Param id path string true "Payment ID"
// @Success 200 {object} entity.Payment
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /payments/{id} [get]
func (h *PaymentHandler) GetPayment(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	payment, err := h.usecase.GetPayment(r.Context(), id)
	if err != nil {
		if errors.Is(err, er.ErrRecordNotFound) {
			http.Error(w, "Payment not found", http.StatusNotFound)
		} else {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(payment)
}

// CreatePayment godoc
// @Summary Create a new payment
// @Description Create a new payment with the input payload
// @Tags payments
// @Accept  json
// @Produce  json
// @Param payment body entity.Payment true "Create payment"
// @Success 201 {object} entity.Payment
// @Failure 400 {object} map[string]string
// @Router /payments [post]
func (h *PaymentHandler) CreatePayment(w http.ResponseWriter, r *http.Request) {
	var payment entity.Payment
	if err := json.NewDecoder(r.Body).Decode(&payment); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	if err := h.usecase.CreatePayment(r.Context(), &payment); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(payment)
}

// UpdatePayment godoc
// @Summary Update a payment
// @Description Update payment details by payment ID
// @Tags payments
// @Accept  json
// @Produce  json
// @Param id path string true "Payment ID"
// @Param payment body entity.Payment true "Update payment"
// @Success 200 {object} entity.Payment
// @Failure 400 {object} map[string]string
// @Router /payments/{id} [put]
func (h *PaymentHandler) UpdatePayment(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	var payment entity.Payment
	if err := json.NewDecoder(r.Body).Decode(&payment); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	payment.ID = id
	if err := h.usecase.UpdatePayment(r.Context(), &payment); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(payment)
}

// UpdatePaymentStatus godoc
// @Summary Update payment status
// @Description Update payment status by payment ID
// @Tags payments
// @Accept  json
// @Produce  json
// @Param id path string true "Payment ID"
// @Param status body object{status=entity.PaymentStatus} true "Payment status"
// @Success 200 {object} entity.Payment
// @Failure 400 {object} map[string]string
// @Router /payments/{id}/status [put]
func (h *PaymentHandler) UpdatePaymentStatus(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	var input struct {
		Status entity.PaymentStatus `json:"status"`
	}
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	payment, err := h.usecase.UpdatePaymentStatus(r.Context(), id, input.Status)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(payment)
}

//func (h *PaymentHandler) DeletePayment(w http.ResponseWriter, r *http.Request) {
//	vars := mux.Vars(r)
//	id, err := uuid.Parse(vars["id"])
//	if err != nil {
//		http.Error(w, "Invalid ID", http.StatusBadRequest)
//		return
//	}
//	if err := h.usecase.DeletePayment(r.Context(), id); err != nil {
//		if err == entity.ErrRecordNotFound {
//			http.Error(w, "Payment not found", http.StatusNotFound)
//		} else {
//			http.Error(w, "Internal server error", http.StatusInternalServerError)
//		}
//		return
//	}
//	w.WriteHeader(http.StatusNoContent)
//}
