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

type MyMasterHandler struct {
	usecase *usecase.MyMasterUsecase
}

func NewMyMasterHandler(usecase *usecase.MyMasterUsecase) *MyMasterHandler {
	return &MyMasterHandler{usecase: usecase}
}

func (h *MyMasterHandler) GetMyMaster(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	myMaster, err := h.usecase.GetMyMaster(r.Context(), id)
	if err != nil {
		if errors.Is(err, er.ErrRecordNotFound) {
			http.Error(w, "MyMaster not found", http.StatusNotFound)
		} else {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(myMaster)
}

func (h *MyMasterHandler) CreateMyMaster(w http.ResponseWriter, r *http.Request) {
	var myMaster entity.MyMaster
	if err := json.NewDecoder(r.Body).Decode(&myMaster); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	if err := h.usecase.CreateMyMaster(r.Context(), &myMaster); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(myMaster)
}

func (h *MyMasterHandler) UpdateMyMaster(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	var myMaster entity.MyMaster
	if err := json.NewDecoder(r.Body).Decode(&myMaster); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	myMaster.ID = id
	if err := h.usecase.UpdateMyMaster(r.Context(), &myMaster); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(myMaster)
}

func (h *MyMasterHandler) DeleteMyMaster(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	if err := h.usecase.DeleteMyMaster(r.Context(), id); err != nil {
		if errors.Is(err, er.ErrRecordNotFound) {
			http.Error(w, "MyMaster not found", http.StatusNotFound)
		} else {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
