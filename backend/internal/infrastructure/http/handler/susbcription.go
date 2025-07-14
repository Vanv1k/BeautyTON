package handler

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/google/uuid"
	"github.com/gorilla/mux"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	er "github.com/Vanv1k/BeautyTON/internal/domain/errors"
	"github.com/Vanv1k/BeautyTON/internal/usecase"
)

type SubscriptionHandler struct {
	usecase *usecase.SubscriptionUsecase
}

func NewSubscriptionHandler(usecase *usecase.SubscriptionUsecase) *SubscriptionHandler {
	return &SubscriptionHandler{usecase: usecase}
}

// GetSubscription godoc
// @Summary Get a subscription by ID
// @Description Get subscription details by subscription ID
// @Tags subscriptions
// @Accept  json
// @Produce  json
// @Param id path string true "Subscription ID"
// @Success 200 {object} entity.Subscription
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /subscriptions/{id} [get]
func (h *SubscriptionHandler) GetSubscription(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	subscription, err := h.usecase.GetSubscription(r.Context(), id)
	if err != nil {
		if errors.Is(err, er.ErrRecordNotFound) {
			http.Error(w, "Subscription not found", http.StatusNotFound)
		} else {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(subscription)
}

// CreateSubscription godoc
// @Summary Create a new subscription
// @Description Create a new subscription with the input payload
// @Tags subscriptions
// @Accept  json
// @Produce  json
// @Param subscription body entity.Subscription true "Create subscription"
// @Success 201 {object} entity.Subscription
// @Failure 400 {object} map[string]string
// @Router /subscriptions [post]
func (h *SubscriptionHandler) CreateSubscription(w http.ResponseWriter, r *http.Request) {
	var subscription entity.Subscription
	if err := json.NewDecoder(r.Body).Decode(&subscription); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	if err := h.usecase.CreateSubscription(r.Context(), &subscription); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(subscription)
}

// UpdateSubscription godoc
// @Summary Update a subscription
// @Description Update subscription details by subscription ID
// @Tags subscriptions
// @Accept  json
// @Produce  json
// @Param id path string true "Subscription ID"
// @Param subscription body entity.Subscription true "Update subscription"
// @Success 200 {object} entity.Subscription
// @Failure 400 {object} map[string]string
// @Router /subscriptions/{id} [put]
func (h *SubscriptionHandler) UpdateSubscription(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	var subscription entity.Subscription
	if err := json.NewDecoder(r.Body).Decode(&subscription); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	subscription.ID = id
	if err := h.usecase.UpdateSubscription(r.Context(), &subscription); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(subscription)
}

// DeleteSubscription godoc
// @Summary Delete a subscription
// @Description Delete a subscription by subscription ID
// @Tags subscriptions
// @Accept  json
// @Produce  json
// @Param id path string true "Subscription ID"
// @Success 204
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /subscriptions/{id} [delete]
func (h *SubscriptionHandler) DeleteSubscription(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	if err := h.usecase.DeleteSubscription(r.Context(), id); err != nil {
		if errors.Is(err, er.ErrRecordNotFound) {
			http.Error(w, "Subscription not found", http.StatusNotFound)
		} else {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
