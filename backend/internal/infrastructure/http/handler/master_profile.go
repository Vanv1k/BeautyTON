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
	json.NewEncoder(w).Encode(profile)
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
