package handler

import (
	"encoding/json"
	"net/http"

	"github.com/google/uuid"
	"github.com/gorilla/mux"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	"github.com/Vanv1k/BeautyTON/internal/domain/errors"
	"github.com/Vanv1k/BeautyTON/internal/usecase"
)

type UserPreferencesHandler struct {
	usecase *usecase.UserPreferencesUsecase
}

func NewUserPreferencesHandler(usecase *usecase.UserPreferencesUsecase) *UserPreferencesHandler {
	return &UserPreferencesHandler{usecase: usecase}
}

func (h *UserPreferencesHandler) GetUserPreferences(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	preferences, err := h.usecase.GetUserPreferences(r.Context(), id)
	if err != nil {
		if err == errors.ErrRecordNotFound {
			http.Error(w, "User preferences not found", http.StatusNotFound)
		} else {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(preferences)
}

func (h *UserPreferencesHandler) CreateUserPreferences(w http.ResponseWriter, r *http.Request) {
	var preferences entity.UserPreferences
	if err := json.NewDecoder(r.Body).Decode(&preferences); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	if err := h.usecase.CreateUserPreferences(r.Context(), &preferences); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(preferences)
}

func (h *UserPreferencesHandler) UpdateUserPreferences(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	var preferences entity.UserPreferences
	if err := json.NewDecoder(r.Body).Decode(&preferences); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	preferences.ID = id
	if err := h.usecase.UpdateUserPreferences(r.Context(), &preferences); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(preferences)
}

func (h *UserPreferencesHandler) DeleteUserPreferences(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	if err := h.usecase.DeleteUserPreferences(r.Context(), id); err != nil {
		if err == errors.ErrRecordNotFound {
			http.Error(w, "User preferences not found", http.StatusNotFound)
		} else {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
