package handler

import (
	"encoding/json"
	"errors"
	"io"
	"net/http"

	"github.com/google/uuid"
	"github.com/gorilla/mux"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	er "github.com/Vanv1k/BeautyTON/internal/domain/errors"
	"github.com/Vanv1k/BeautyTON/internal/usecase"
)

type FileHandler struct {
	usecase *usecase.FileUsecase
}

func NewFileHandler(usecase *usecase.FileUsecase) *FileHandler {
	return &FileHandler{usecase: usecase}
}

// GetFile godoc
// @Summary Get a file by ID
// @Description Download file by file ID
// @Tags files
// @Accept  json
// @Produce  application/octet-stream
// @Param id path string true "File ID"
// @Success 200 {file} binary
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /files/{id} [get]
func (h *FileHandler) GetFile(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	if id == "" {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	file, content, err := h.usecase.GetFile(r.Context(), id)
	if err != nil {
		if errors.Is(err, er.ErrRecordNotFound) {
			http.Error(w, "File not found", http.StatusNotFound)
		} else {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}
	w.Header().Set("Content-Type", file.MimeType)
	w.Header().Set("Content-Length", string(file.Size))
	_, err = io.Copy(w, content)
	if err != nil {
		http.Error(w, "Failed to stream file", http.StatusInternalServerError)
		return
	}
}

// UploadFile godoc
// @Summary Upload a file
// @Description Upload a file to the server
// @Tags files
// @Accept  multipart/form-data
// @Produce  json
// @Param file formData file true "File to upload"
// @Success 200 {object} map[string]string
// @Failure 400 {object} map[string]string
// @Router /files [post]
func (h *FileHandler) UploadFile(w http.ResponseWriter, r *http.Request) {
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
	if err := h.usecase.UploadFile(r.Context(), fileEntity, file); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"file_id": fileEntity.ID})
}
