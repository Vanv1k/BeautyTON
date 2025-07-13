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

// GetMyMaster godoc
// @Summary Get a my master by ID
// @Description Get my master details by my master ID
// @Tags my-masters
// @Accept  json
// @Produce  json
// @Param id path string true "My Master ID"
// @Success 200 {object} entity.MyMaster
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /my_masters/{id} [get]
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

// CreateMyMaster godoc
// @Summary Create a new my master
// @Description Create a new my master with the input payload
// @Tags my-masters
// @Accept  json
// @Produce  json
// @Param mymaster body entity.MyMaster true "Create my master"
// @Success 201 {object} entity.MyMaster
// @Failure 400 {object} map[string]string
// @Router /my_masters [post]
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

// UpdateMyMaster godoc
// @Summary Update a my master
// @Description Update my master details by my master ID
// @Tags my-masters
// @Accept  json
// @Produce  json
// @Param id path string true "My Master ID"
// @Param mymaster body entity.MyMaster true "Update my master"
// @Success 200 {object} entity.MyMaster
// @Failure 400 {object} map[string]string
// @Router /my_masters/{id} [put]
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

// DeleteMyMaster godoc
// @Summary Delete a my master
// @Description Delete a my master by my master ID
// @Tags my-masters
// @Accept  json
// @Produce  json
// @Param id path string true "My Master ID"
// @Success 204
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /my_masters/{id} [delete]
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
