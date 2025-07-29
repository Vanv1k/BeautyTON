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

type MasterProfileHandler struct {
	usecase *usecase.MasterProfileUsecase
}

func NewMasterProfileHandler(usecase *usecase.MasterProfileUsecase) *MasterProfileHandler {
	return &MasterProfileHandler{usecase: usecase}
}

// GetMasterProfile godoc
// @Summary Get a master profile by ID
// @Description Get master profile details by master profile ID
// @Tags master-profiles
// @Accept  json
// @Produce  json
// @Param id path string true "Master Profile ID"
// @Success 200 {object} entity.MasterProfile
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /master_profiles/{id} [get]
func (h *MasterProfileHandler) GetMasterProfile(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	profile, err := h.usecase.GetMasterProfile(r.Context(), id)
	if err != nil {
		if errors.Is(err, er.ErrRecordNotFound) {
			http.Error(w, "Master profile not found", http.StatusNotFound)
		} else {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(profile)
}

// CreateMasterProfile godoc
// @Summary Create a new master profile
// @Description Create a new master profile with the input payload
// @Tags master-profiles
// @Accept  json
// @Produce  json
// @Param profile body entity.MasterProfile true "Create master profile"
// @Success 201 {object} entity.MasterProfile
// @Failure 400 {object} map[string]string
// @Router /master_profiles [post]
func (h *MasterProfileHandler) CreateMasterProfile(w http.ResponseWriter, r *http.Request) {
	var profile entity.MasterProfile
	if err := json.NewDecoder(r.Body).Decode(&profile); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	if err := h.usecase.CreateMasterProfile(r.Context(), &profile); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	response := map[string]interface{}{
		"results": profile,
	}
	json.NewEncoder(w).Encode(response)
}

// UpdateMasterProfile godoc
// @Summary Update a master profile
// @Description Update master profile details by master profile ID
// @Tags master-profiles
// @Accept  json
// @Produce  json
// @Param id path string true "Master Profile ID"
// @Param profile body entity.MasterProfile true "Update master profile"
// @Success 200 {object} entity.MasterProfile
// @Failure 400 {object} map[string]string
// @Router /master_profiles/{id} [put]
func (h *MasterProfileHandler) UpdateMasterProfile(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	var profile entity.MasterProfile
	if err := json.NewDecoder(r.Body).Decode(&profile); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	profile.ID = id
	if err := h.usecase.UpdateMasterProfile(r.Context(), &profile); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(profile)
}

// UpdateMasterProfileRating godoc
// @Summary Update master profile rating
// @Description Update master profile rating by master profile ID
// @Tags master-profiles
// @Accept  json
// @Produce  json
// @Param id path string true "Master Profile ID"
// @Param rating body object{rating=number} true "Rating value"
// @Success 200 {object} entity.MasterProfile
// @Failure 400 {object} map[string]string
// @Router /master_profiles/{id}/rating [put]
func (h *MasterProfileHandler) UpdateMasterProfileRating(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	var input struct {
		Rating float64 `json:"rating"`
	}
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	profile, err := h.usecase.UpdateMasterProfileRating(r.Context(), id, input.Rating)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(profile)
}

// DeleteMasterProfile godoc
// @Summary Delete a master profile
// @Description Delete a master profile by master profile ID
// @Tags master-profiles
// @Accept  json
// @Produce  json
// @Param id path string true "Master Profile ID"
// @Success 204
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /master_profiles/{id} [delete]
func (h *MasterProfileHandler) DeleteMasterProfile(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	if err := h.usecase.DeleteMasterProfile(r.Context(), id); err != nil {
		if errors.Is(err, er.ErrRecordNotFound) {
			http.Error(w, "Master profile not found", http.StatusNotFound)
		} else {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

// ListProfiles godoc
// @Summary List profiles with pagination and filters
// @Description Retrieve a paginated list of master profiles with optional filters
// @Tags master-profiles
// @Accept  json
// @Produce  json
// @Param query query string false "Search by profile name (partial match)"
// @Param category query string false "Filter by category (e.g., hairdresser, nail_technician)"
// @Param city query string false "Filter by city name (partial match)"
// @Param priceFrom query int false "Minimum service price"
// @Param priceTo query int false "Maximum service price"
// @Param rating query float64 false "Minimum profile rating (0 to 5)"
// @Param page query int false "Page number (default: 1)"
// @Param page_size query int false "Number of profiles per page (default: 10, max: 100)"
// @Success 200 {object} map[string]interface{} "Paginated list of profiles with metadata"
// @Failure 400 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /master_profiles [get]
func (h *MasterProfileHandler) ListProfiles(w http.ResponseWriter, r *http.Request) {
	// Parse query parameters
	query := r.URL.Query().Get("query")
	category := r.URL.Query().Get("category")
	city := r.URL.Query().Get("city")
	priceFromStr := r.URL.Query().Get("priceFrom")
	priceToStr := r.URL.Query().Get("priceTo")
	ratingStr := r.URL.Query().Get("rating")
	pageStr := r.URL.Query().Get("page")
	pageSizeStr := r.URL.Query().Get("page_size")

	// Default values
	page := 1
	pageSize := 10
	maxPageSize := 100
	priceFrom := 0
	priceTo := 0
	rating := 0.0

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

	// Parse and validate priceFrom
	if priceFromStr != "" {
		var err error
		priceFrom, err = strconv.Atoi(priceFromStr)
		if err != nil || priceFrom < 0 {
			http.Error(w, "Invalid priceFrom", http.StatusBadRequest)
			return
		}
	}

	// Parse and validate priceTo
	if priceToStr != "" {
		var err error
		priceTo, err = strconv.Atoi(priceToStr)
		if err != nil || priceTo < 0 {
			http.Error(w, "Invalid priceTo", http.StatusBadRequest)
			return
		}
	}

	// Parse and validate rating
	if ratingStr != "" {
		var err error
		rating, err = strconv.ParseFloat(ratingStr, 64)
		if err != nil || rating < 0 || rating > 5 {
			http.Error(w, "Invalid rating (must be between 0 and 5)", http.StatusBadRequest)
			return
		}
	}

	// Fetch paginated profiles
	profiles, total, err := h.usecase.List(r.Context(), query, category, city, priceFrom, priceTo, rating, page, pageSize)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Calculate total pages
	totalPages := int((total + int64(pageSize) - 1) / int64(pageSize))

	// Prepare response
	response := map[string]interface{}{
		"results":     profiles,
		"page":        page,
		"page_size":   pageSize,
		"total":       total,
		"total_pages": totalPages,
	}

	// Send response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
