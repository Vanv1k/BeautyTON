package usecase

import (
	"context"
	"errors"

	"github.com/google/uuid"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	"github.com/Vanv1k/BeautyTON/internal/domain/repository"
)

type PaymentUsecase struct {
	paymentRepo repository.PaymentRepository
	userRepo    repository.UserRepository
}

func NewPaymentUsecase(paymentRepo repository.PaymentRepository, userRepo repository.UserRepository) *PaymentUsecase {
	return &PaymentUsecase{
		paymentRepo: paymentRepo,
		userRepo:    userRepo,
	}
}

func (u *PaymentUsecase) GetPayment(ctx context.Context, id uuid.UUID) (*entity.Payment, error) {
	return u.paymentRepo.GetByID(ctx, id)
}

func (u *PaymentUsecase) CreatePayment(ctx context.Context, payment *entity.Payment) error {
	// Валидация бизнес-логики
	if payment.Amount <= 0 {
		return errors.New("amount must be positive")
	}
	if payment.Type != entity.PaymentTypePayment && payment.Type != entity.PaymentTypeTip {
		return errors.New("invalid payment type")
	}
	if payment.Status != entity.PaymentStatusPending && payment.Status != entity.PaymentStatusCompleted && payment.Status != entity.PaymentStatusFailed {
		return errors.New("invalid payment status")
	}
	if payment.ClientID != nil {
		if _, err := u.userRepo.GetByID(ctx, *payment.ClientID); err != nil {
			return errors.New("invalid client_id")
		}
	}
	if payment.MasterID != nil {
		master, err := u.userRepo.GetByID(ctx, *payment.MasterID)
		if err != nil {
			return errors.New("invalid master_id")
		}
		if master.Role != entity.UserRoleMaster {
			return errors.New("master_id must refer to a master")
		}
	}
	return u.paymentRepo.Create(ctx, payment)
}

func (u *PaymentUsecase) UpdatePayment(ctx context.Context, payment *entity.Payment) error {
	// Валидация бизнес-логики
	if payment.Amount <= 0 {
		return errors.New("amount must be positive")
	}
	if payment.Type != entity.PaymentTypePayment && payment.Type != entity.PaymentTypeTip {
		return errors.New("invalid payment type")
	}
	if payment.Status != entity.PaymentStatusPending && payment.Status != entity.PaymentStatusCompleted && payment.Status != entity.PaymentStatusFailed {
		return errors.New("invalid payment status")
	}
	if payment.ClientID != nil {
		if _, err := u.userRepo.GetByID(ctx, *payment.ClientID); err != nil {
			return errors.New("invalid client_id")
		}
	}
	if payment.MasterID != nil {
		master, err := u.userRepo.GetByID(ctx, *payment.MasterID)
		if err != nil {
			return errors.New("invalid master_id")
		}
		if master.Role != entity.UserRoleMaster {
			return errors.New("master_id must refer to a master")
		}
	}
	return u.paymentRepo.Update(ctx, payment)
}

func (u *PaymentUsecase) UpdatePaymentStatus(ctx context.Context, id uuid.UUID, status entity.PaymentStatus) (*entity.Payment, error) {
	// Валидация бизнес-логики
	if status != entity.PaymentStatusPending && status != entity.PaymentStatusCompleted && status != entity.PaymentStatusFailed {
		return nil, errors.New("invalid payment status")
	}
	payment, err := u.paymentRepo.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	payment.Status = status
	if err := u.paymentRepo.Update(ctx, payment); err != nil {
		return nil, err
	}
	return payment, nil
}
