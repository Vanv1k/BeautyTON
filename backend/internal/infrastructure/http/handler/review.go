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

type ReviewHandler struct {
	usecase *usecase.ReviewUsecase
}

func NewReviewHandler(usecase *usecase.ReviewUsecase) *ReviewHandler {
	return &ReviewHandler{usecase: usecase}
}

// GetReview godoc
// @Summary Get a review by ID
// @Description Get review details by review ID
// @Tags reviews
// @Accept  json
// @Produce  json
// @Param id path string true "Review ID"
// @Success 200 {object} entity.Review
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /reviews/{id} [get]
func (h *ReviewHandler) GetReview(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	review, err := h.usecase.GetReview(r.Context(), id)
	if err != nil {
		if errors.Is(err, er.ErrRecordNotFound) {
			http.Error(w, "Review not found", http.StatusNotFound)
		} else {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(review)
}

// CreateReview godoc
// @Summary Create a new review
// @Description Create a new review with the input payload
// @Tags reviews
// @Accept  json
// @Produce  json
// @Param review body entity.Review true "Create review"
// @Success 201 {object} entity.Review
// @Failure 400 {object} map[string]string
// @Router /reviews [post]
func (h *ReviewHandler) CreateReview(w http.ResponseWriter, r *http.Request) {
	var review entity.Review
	if err := json.NewDecoder(r.Body).Decode(&review); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	if err := h.usecase.CreateReview(r.Context(), &review); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(review)
}

// UpdateReview godoc
// @Summary Update a review
// @Description Update review details by review ID
// @Tags reviews
// @Accept  json
// @Produce  json
// @Param id path string true "Review ID"
// @Param review body entity.Review true "Update review"
// @Success 200 {object} entity.Review
// @Failure 400 {object} map[string]string
// @Router /reviews/{id} [put]
func (h *ReviewHandler) UpdateReview(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	var review entity.Review
	if err := json.NewDecoder(r.Body).Decode(&review); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	review.ID = id
	if err := h.usecase.UpdateReview(r.Context(), &review); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(review)
}

// DeleteReview godoc
// @Summary Delete a review
// @Description Delete a review by review ID
// @Tags reviews
// @Accept  json
// @Produce  json
// @Param id path string true "Review ID"
// @Success 204
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /reviews/{id} [delete]
func (h *ReviewHandler) DeleteReview(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	if err := h.usecase.DeleteReview(r.Context(), id); err != nil {
		if errors.Is(err, er.ErrRecordNotFound) {
			http.Error(w, "Review not found", http.StatusNotFound)
		} else {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
