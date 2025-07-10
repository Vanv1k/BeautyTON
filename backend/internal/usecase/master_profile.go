package usecase

import (
	"context"
	"errors"
	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	"github.com/Vanv1k/BeautyTON/internal/domain/repository"
	"github.com/google/uuid"
	"time"
)

type BookingUsecase struct {
	bookingRepo repository.BookingRepository
	userRepo    repository.UserRepository
	serviceRepo repository.ServiceRepository
}

func NewBookingUsecase(bookingRepo repository.BookingRepository, userRepo repository.UserRepository, serviceRepo repository.ServiceRepository) *BookingUsecase {
	return &BookingUsecase{bookingRepo: bookingRepo, userRepo: userRepo, serviceRepo: serviceRepo}
}

func (u *BookingUsecase) GetBooking(ctx context.Context, id uuid.UUID) (*entity.Booking, error) {
	return u.bookingRepo.GetByID(ctx, id)
}

func (u *BookingUsecase) CreateBooking(ctx context.Context, booking *entity.Booking) error {
	// Валидация бизнес-логики
	if booking.ClientID == uuid.Nil || booking.MasterID == uuid.Nil || booking.ServiceID == uuid.Nil {
		return errors.New("client_id, master_id, and service_id are required")
	}
	if booking.BookingTime.Before(time.Now()) {
		return errors.New("booking_time must be in the future")
	}
	if booking.Status != entity.BookingStatusPending && booking.Status != entity.BookingStatusConfirmed &&
		booking.Status != entity.BookingStatusCompleted && booking.Status != entity.BookingStatusCanceled {
		return errors.New("invalid booking status")
	}
	// Проверяем, что клиент и мастер существуют
	client, err := u.userRepo.GetByID(ctx, booking.ClientID)
	if err != nil {
		return err
	}
	if client.Role != entity.UserRoleClient {
		return errors.New("client_id must refer to a client")
	}
	master, err := u.userRepo.GetByID(ctx, booking.MasterID)
	if err != nil {
		return err
	}
	if master.Role != entity.UserRoleMaster {
		return errors.New("master_id must refer to a master")
	}
	// Проверяем, что услуга существует
	if _, err := u.serviceRepo.GetByID(ctx, booking.ServiceID); err != nil {
		return err
	}
	return u.bookingRepo.Create(ctx, booking)
}

func (u *BookingUsecase) UpdateBooking(ctx context.Context, booking *entity.Booking) error {
	// Валидация бизнес-логики
	if booking.ClientID == uuid.Nil || booking.MasterID == uuid.Nil || booking.ServiceID == uuid.Nil {
		return errors.New("client_id, master_id, and service_id are required")
	}
	if booking.BookingTime.Before(time.Now()) {
		return errors.New("booking_time must be in the future")
	}
	if booking.Status != entity.BookingStatusPending && booking.Status != entity.BookingStatusConfirmed &&
		booking.Status != entity.BookingStatusCompleted && booking.Status != entity.BookingStatusCanceled {
		return errors.New("invalid booking status")
	}
	return u.bookingRepo.Update(ctx, booking)
}

func (u *BookingUsecase) UpdateBookingStatus(ctx context.Context, id uuid.UUID, status entity.BookingStatus) (*entity.Booking, error) {
	// Валидация бизнес-логики
	if status != entity.BookingStatusPending && status != entity.BookingStatusConfirmed &&
		status != entity.BookingStatusCompleted && status != entity.BookingStatusCanceled {
		return nil, errors.New("invalid booking status")
	}
	booking, err := u.bookingRepo.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	booking.Status = status
	if err := u.bookingRepo.Update(ctx, booking); err != nil {
		return nil, err
	}
	return booking, nil
}

func (u *BookingUsecase) DeleteBooking(ctx context.Context, id uuid.UUID) error {
	return u.bookingRepo.Delete(ctx, id)
}
