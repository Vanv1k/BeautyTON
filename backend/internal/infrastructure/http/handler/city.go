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

type CityHandler struct {
	usecase *usecase.CityUsecase
}

func NewCityHandler(usecase *usecase.CityUsecase) *CityHandler {
	return &CityHandler{usecase: usecase}
}

// GetCity godoc
// @Summary Get a city by ID
// @Description Get city details by city ID
// @Tags cities
// @Accept  json
// @Produce  json
// @Param id path string true "City ID"
// @Success 200 {object} entity.City
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /cities/{id} [get]
func (h *CityHandler) GetCity(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	city, err := h.usecase.GetCity(r.Context(), id)
	if err != nil {
		if errors.Is(err, er.ErrRecordNotFound) {
			http.Error(w, "City not found", http.StatusNotFound)
		} else {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(city)
}

// CreateCity godoc
// @Summary Create a new city
// @Description Create a new city with the input payload
// @Tags cities
// @Accept  json
// @Produce  json
// @Param city body entity.City true "Create city"
// @Success 201 {object} entity.City
// @Failure 400 {object} map[string]string
// @Router /cities [post]
func (h *CityHandler) CreateCity(w http.ResponseWriter, r *http.Request) {
	var city entity.City
	if err := json.NewDecoder(r.Body).Decode(&city); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	if err := h.usecase.CreateCity(r.Context(), &city); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(city)
}

// UpdateCity godoc
// @Summary Update a city
// @Description Update city details by city ID
// @Tags cities
// @Accept  json
// @Produce  json
// @Param id path string true "City ID"
// @Param city body entity.City true "Update city"
// @Success 200 {object} entity.City
// @Failure 400 {object} map[string]string
// @Router /cities/{id} [put]
func (h *CityHandler) UpdateCity(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	var city entity.City
	if err := json.NewDecoder(r.Body).Decode(&city); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	city.ID = id
	if err := h.usecase.UpdateCity(r.Context(), &city); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(city)
}

// DeleteCity godoc
// @Summary Delete a city
// @Description Delete a city by city ID
// @Tags cities
// @Accept  json
// @Produce  json
// @Param id path string true "City ID"
// @Success 204
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /cities/{id} [delete]
func (h *CityHandler) DeleteCity(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	if err := h.usecase.DeleteCity(r.Context(), id); err != nil {
		if errors.Is(err, er.ErrRecordNotFound) {
			http.Error(w, "City not found", http.StatusNotFound)
		} else {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
