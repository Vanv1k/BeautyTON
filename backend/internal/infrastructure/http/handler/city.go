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
