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

type CountryHandler struct {
	usecase *usecase.CountryUsecase
}

func NewCountryHandler(usecase *usecase.CountryUsecase) *CountryHandler {
	return &CountryHandler{usecase: usecase}
}

// GetCountry godoc
// @Summary Get a country by ID
// @Description Get country details by country ID
// @Tags countries
// @Accept  json
// @Produce  json
// @Param id path string true "Country ID"
// @Success 200 {object} entity.Country
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /countries/{id} [get]
func (h *CountryHandler) GetCountry(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	country, err := h.usecase.GetCountry(r.Context(), id)
	if err != nil {
		if errors.Is(err, er.ErrRecordNotFound) {
			http.Error(w, "Country not found", http.StatusNotFound)
		} else {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(country)
}

// CreateCountry godoc
// @Summary Create a new country
// @Description Create a new country with the input payload
// @Tags countries
// @Accept  json
// @Produce  json
// @Param country body entity.Country true "Create country"
// @Success 201 {object} entity.Country
// @Failure 400 {object} map[string]string
// @Router /countries [post]
func (h *CountryHandler) CreateCountry(w http.ResponseWriter, r *http.Request) {
	var country entity.Country
	if err := json.NewDecoder(r.Body).Decode(&country); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	if err := h.usecase.CreateCountry(r.Context(), &country); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(country)
}

// UpdateCountry godoc
// @Summary Update a country
// @Description Update country details by country ID
// @Tags countries
// @Accept  json
// @Produce  json
// @Param id path string true "Country ID"
// @Param country body entity.Country true "Update country"
// @Success 200 {object} entity.Country
// @Failure 400 {object} map[string]string
// @Router /countries/{id} [put]
func (h *CountryHandler) UpdateCountry(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	var country entity.Country
	if err := json.NewDecoder(r.Body).Decode(&country); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	country.ID = id
	if err := h.usecase.UpdateCountry(r.Context(), &country); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(country)
}

// DeleteCountry godoc
// @Summary Delete a country
// @Description Delete a country by country ID
// @Tags countries
// @Accept  json
// @Produce  json
// @Param id path string true "Country ID"
// @Success 204
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /countries/{id} [delete]
func (h *CountryHandler) DeleteCountry(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	if err := h.usecase.DeleteCountry(r.Context(), id); err != nil {
		if errors.Is(err, er.ErrRecordNotFound) {
			http.Error(w, "Country not found", http.StatusNotFound)
		} else {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
