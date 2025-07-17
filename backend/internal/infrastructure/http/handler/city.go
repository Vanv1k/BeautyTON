package handler

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"

	"github.com/google/uuid"
	"github.com/gorilla/mux"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	er "github.com/Vanv1k/BeautyTON/internal/domain/errors"
	"github.com/Vanv1k/BeautyTON/internal/usecase"
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

// ListCities godoc
// @Summary List cities with pagination
// @Description Retrieve a paginated list of cities
// @Tags cities
// @Accept  json
// @Produce  json
// @Param page query int false "Page number (default: 1)"
// @Param page_size query int false "Number of cities per page (default: 10, max: 100)"
// @Success 200 {object} map[string]interface{} "Paginated list of cities with metadata"
// @Failure 400 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /cities [get]
func (h *CityHandler) ListCities(w http.ResponseWriter, r *http.Request) {
	// Parse query parameters
	pageStr := r.URL.Query().Get("page")
	pageSizeStr := r.URL.Query().Get("page_size")

	// Default values
	page := 1
	pageSize := 10
	maxPageSize := 100

	// Parse and validate page
	if pageStr != "" {
		var err error
		page, err = strconv.Atoi(pageStr)
		if err != nil || page < 1 {
			http.Error(w, "Invalid page number", http.StatusBadRequest)
			return
		}
	}

	// Parse and validate page_size
	if pageSizeStr != "" {
		var err error
		pageSize, err = strconv.Atoi(pageSizeStr)
		if err != nil || pageSize < 1 {
			http.Error(w, "Invalid page size", http.StatusBadRequest)
			return
		}
		if pageSize > maxPageSize {
			pageSize = maxPageSize
		}
	}

	// Fetch paginated cities
	cities, total, err := h.usecase.ListCities(r.Context(), page, pageSize)
	if err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	// Calculate total pages
	totalPages := int((total + int64(pageSize) - 1) / int64(pageSize))

	// Prepare response
	response := map[string]interface{}{
		"cities": cities,
		"pagination": map[string]interface{}{
			"page":        page,
			"page_size":   pageSize,
			"total":       total,
			"total_pages": totalPages,
		},
	}

	// Send response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
