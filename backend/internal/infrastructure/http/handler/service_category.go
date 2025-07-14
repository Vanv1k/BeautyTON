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

type ServiceCategoryHandler struct {
	usecase *usecase.ServiceCategoryUsecase
}

func NewServiceCategoryHandler(usecase *usecase.ServiceCategoryUsecase) *ServiceCategoryHandler {
	return &ServiceCategoryHandler{usecase: usecase}
}

// GetServiceCategory godoc
// @Summary Get a service category by ID
// @Description Get service category details by service category ID
// @Tags service-categories
// @Accept  json
// @Produce  json
// @Param id path string true "Service Category ID"
// @Success 200 {object} entity.ServiceCategory
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /service_categories/{id} [get]
func (h *ServiceCategoryHandler) GetServiceCategory(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	category, err := h.usecase.GetServiceCategory(r.Context(), id)
	if err != nil {
		if errors.Is(err, er.ErrRecordNotFound) {
			http.Error(w, "Service category not found", http.StatusNotFound)
		} else {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(category)
}

// CreateServiceCategory godoc
// @Summary Create a new service category
// @Description Create a new service category with the input payload
// @Tags service-categories
// @Accept  json
// @Produce  json
// @Param category body entity.ServiceCategory true "Create service category"
// @Success 201 {object} entity.ServiceCategory
// @Failure 400 {object} map[string]string
// @Router /service_categories [post]
func (h *ServiceCategoryHandler) CreateServiceCategory(w http.ResponseWriter, r *http.Request) {
	var category entity.ServiceCategory
	if err := json.NewDecoder(r.Body).Decode(&category); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	if err := h.usecase.CreateServiceCategory(r.Context(), &category); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(category)
}

// UpdateServiceCategory godoc
// @Summary Update a service category
// @Description Update service category details by service category ID
// @Tags service-categories
// @Accept  json
// @Produce  json
// @Param id path string true "Service Category ID"
// @Param category body entity.ServiceCategory true "Update service category"
// @Success 200 {object} entity.ServiceCategory
// @Failure 400 {object} map[string]string
// @Router /service_categories/{id} [put]
func (h *ServiceCategoryHandler) UpdateServiceCategory(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	var category entity.ServiceCategory
	if err := json.NewDecoder(r.Body).Decode(&category); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	category.ID = id
	if err := h.usecase.UpdateServiceCategory(r.Context(), &category); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(category)
}

// DeleteServiceCategory godoc
// @Summary Delete a service category
// @Description Delete a service category by service category ID
// @Tags service-categories
// @Accept  json
// @Produce  json
// @Param id path string true "Service Category ID"
// @Success 204
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /service_categories/{id} [delete]
func (h *ServiceCategoryHandler) DeleteServiceCategory(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	if err := h.usecase.DeleteServiceCategory(r.Context(), id); err != nil {
		if errors.Is(err, er.ErrRecordNotFound) {
			http.Error(w, "Service category not found", http.StatusNotFound)
		} else {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
