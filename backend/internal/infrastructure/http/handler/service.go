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

type ServiceHandler struct {
	usecase *usecase.ServiceUsecase
}

func NewServiceHandler(usecase *usecase.ServiceUsecase) *ServiceHandler {
	return &ServiceHandler{usecase: usecase}
}

// GetService godoc
// @Summary Get a service by ID
// @Description Get service details by service ID
// @Tags services
// @Accept  json
// @Produce  json
// @Param id path string true "Service ID"
// @Success 200 {object} entity.Service
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /services/{id} [get]
func (h *ServiceHandler) GetService(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	service, err := h.usecase.GetService(r.Context(), id)
	if err != nil {
		if errors.Is(err, er.ErrRecordNotFound) {
			http.Error(w, "Service not found", http.StatusNotFound)
		} else {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(service)
}

// CreateService godoc
// @Summary Create a new service
// @Description Create a new service with the input payload
// @Tags services
// @Accept  json
// @Produce  json
// @Param service body entity.Service true "Create service"
// @Success 201 {object} entity.Service
// @Failure 400 {object} map[string]string
// @Router /services [post]
func (h *ServiceHandler) CreateService(w http.ResponseWriter, r *http.Request) {
	var service entity.Service
	if err := json.NewDecoder(r.Body).Decode(&service); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	if err := h.usecase.CreateService(r.Context(), &service); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(service)
}

// UpdateService godoc
// @Summary Update a service
// @Description Update service details by service ID
// @Tags services
// @Accept  json
// @Produce  json
// @Param id path string true "Service ID"
// @Param service body entity.Service true "Update service"
// @Success 200 {object} entity.Service
// @Failure 400 {object} map[string]string
// @Router /services/{id} [put]
func (h *ServiceHandler) UpdateService(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	var service entity.Service
	if err := json.NewDecoder(r.Body).Decode(&service); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	service.ID = id
	if err := h.usecase.UpdateService(r.Context(), &service); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(service)
}

// DeleteService godoc
// @Summary Delete a service
// @Description Delete a service by service ID
// @Tags services
// @Accept  json
// @Produce  json
// @Param id path string true "Service ID"
// @Success 204
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /services/{id} [delete]
func (h *ServiceHandler) DeleteService(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	if err := h.usecase.DeleteService(r.Context(), id); err != nil {
		if errors.Is(err, er.ErrRecordNotFound) {
			http.Error(w, "Service not found", http.StatusNotFound)
		} else {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

// UploadServicePhoto godoc
// @Summary Upload service photo
// @Description Upload a photo for a service
// @Tags services
// @Accept  multipart/form-data
// @Produce  json
// @Param id path string true "Service ID"
// @Param file formData file true "Photo file"
// @Success 200 {object} map[string]string
// @Failure 400 {object} map[string]string
// @Router /services/{id}/photo [post]
func (h *ServiceHandler) UploadServicePhoto(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	if err := r.ParseMultipartForm(10 << 20); err != nil { // 10 MB limit
		http.Error(w, "File too large or invalid form", http.StatusBadRequest)
		return
	}
	file, header, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "Invalid file", http.StatusBadRequest)
		return
	}
	defer file.Close()
	fileEntity := &entity.File{
		ID:       uuid.New().String(),
		Name:     header.Filename,
		Size:     header.Size,
		MimeType: header.Header.Get("Content-Type"),
	}
	if err := h.usecase.UploadServicePhoto(r.Context(), id, fileEntity, file); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"file_id": fileEntity.ID})
}
