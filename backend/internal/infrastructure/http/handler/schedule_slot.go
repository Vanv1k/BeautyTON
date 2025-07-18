package handler

import (
	"encoding/json"
	"errors"
	"net/http"
	"time"

	"github.com/google/uuid"
	"github.com/gorilla/mux"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	er "github.com/Vanv1k/BeautyTON/internal/domain/errors"
	"github.com/Vanv1k/BeautyTON/internal/usecase"
)

type ScheduleSlotHandler struct {
	usecase *usecase.ScheduleSlotUsecase
}

func NewScheduleSlotHandler(usecase *usecase.ScheduleSlotUsecase) *ScheduleSlotHandler {
	return &ScheduleSlotHandler{usecase: usecase}
}

// GetScheduleSlot godoc
// @Summary Get a schedule slot by ID
// @Description Get schedule slot details by ID
// @Tags schedule_slots
// @Accept json
// @Produce json
// @Param id path string true "Schedule Slot ID"
// @Success 200 {object} entity.ScheduleSlot
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /schedule_slots/{id} [get]
func (h *ScheduleSlotHandler) GetScheduleSlot(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	slot, err := h.usecase.GetScheduleSlot(r.Context(), id)
	if err != nil {
		if errors.Is(err, er.ErrRecordNotFound) {
			http.Error(w, "Schedule slot not found", http.StatusNotFound)
		} else {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(slot)
}

// ListScheduleSlots godoc
// @Summary List schedule slots for a master
// @Description Get all schedule slots for a given master ID
// @Tags schedule_slots
// @Accept json
// @Produce json
// @Param master_id query string true "Master ID"
// @Success 200 {array} entity.ScheduleSlot
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /schedule_slots [get]
func (h *ScheduleSlotHandler) ListScheduleSlots(w http.ResponseWriter, r *http.Request) {
	masterIDStr := r.URL.Query().Get("master_id")
	masterID, err := uuid.Parse(masterIDStr)
	if err != nil {
		http.Error(w, "Invalid master_id", http.StatusBadRequest)
		return
	}
	slots, err := h.usecase.ListScheduleSlots(r.Context(), masterID)
	if err != nil {
		if err.Error() == "master profile not found" {
			http.Error(w, err.Error(), http.StatusNotFound)
		} else {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}
	w.Header().Set("Content-Type", "application/json")
	response := map[string]interface{}{
		"results": slots,
	}

	json.NewEncoder(w).Encode(response)
}

// CreateScheduleSlot godoc
// @Summary Create a new schedule slot
// @Description Create a new schedule slot with the input payload
// @Tags schedule_slots
// @Accept json
// @Produce json
// @Param slot body entity.ScheduleSlot true "Create schedule slot"
// @Success 201 {object} entity.ScheduleSlot
// @Failure 400 {object} map[string]string
// @Failure 401 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Router /schedule_slots [post]
func (h *ScheduleSlotHandler) CreateScheduleSlot(w http.ResponseWriter, r *http.Request) {
	var slot entity.ScheduleSlot
	if err := json.NewDecoder(r.Body).Decode(&slot); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	slot.ID = uuid.New()
	slot.CreatedAt = time.Now()
	slot.UpdatedAt = time.Now()
	if err := h.usecase.CreateScheduleSlot(r.Context(), &slot); err != nil {
		if err.Error() == "master profile not found" || err.Error() == "booking not found" {
			http.Error(w, err.Error(), http.StatusNotFound)
		} else if err.Error() == "unauthorized" {
			http.Error(w, err.Error(), http.StatusUnauthorized)
		} else {
			http.Error(w, err.Error(), http.StatusBadRequest)
		}
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(slot)
}

// UpdateScheduleSlot godoc
// @Summary Update a schedule slot
// @Description Update schedule slot details by ID
// @Tags schedule_slots
// @Accept json
// @Produce json
// @Param id path string true "Schedule Slot ID"
// @Param slot body entity.ScheduleSlot true "Update schedule slot"
// @Success 200 {object} entity.ScheduleSlot
// @Failure 400 {object} map[string]string
// @Failure 401 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Router /schedule_slots/{id} [put]
func (h *ScheduleSlotHandler) UpdateScheduleSlot(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	var slot entity.ScheduleSlot
	if err := json.NewDecoder(r.Body).Decode(&slot); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	slot.ID = id
	slot.UpdatedAt = time.Now()
	if err := h.usecase.UpdateScheduleSlot(r.Context(), &slot); err != nil {
		if err.Error() == "master profile not found" || err.Error() == "booking not found" || errors.Is(err, er.ErrRecordNotFound) {
			http.Error(w, err.Error(), http.StatusNotFound)
		} else if err.Error() == "unauthorized" {
			http.Error(w, err.Error(), http.StatusUnauthorized)
		} else {
			http.Error(w, err.Error(), http.StatusBadRequest)
		}
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(slot)
}

// DeleteScheduleSlot godoc
// @Summary Delete a schedule slot
// @Description Delete a schedule slot by ID
// @Tags schedule_slots
// @Accept json
// @Produce json
// @Param id path string true "Schedule Slot ID"
// @Success 204
// @Failure 400 {object} map[string]string
// @Failure 401 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Router /schedule_slots/{id} [delete]
func (h *ScheduleSlotHandler) DeleteScheduleSlot(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := uuid.Parse(vars["id"])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	if err := h.usecase.DeleteScheduleSlot(r.Context(), id); err != nil {
		if errors.Is(err, er.ErrRecordNotFound) {
			http.Error(w, "Schedule slot not found", http.StatusNotFound)
		} else if err.Error() == "unauthorized" {
			http.Error(w, err.Error(), http.StatusUnauthorized)
		} else {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
