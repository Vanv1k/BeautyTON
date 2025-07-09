package usecase

import (
	"context"
	"errors"

	"github.com/google/uuid"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	"github.com/Vanv1k/BeautyTON/internal/domain/repository"
)

type ReviewUsecase struct {
	reviewRepo  repository.ReviewRepository
	bookingRepo repository.BookingRepository
}

func NewReviewUsecase(reviewRepo repository.ReviewRepository, bookingRepo repository.BookingRepository) *ReviewUsecase {
	return &ReviewUsecase{
		reviewRepo:  reviewRepo,
		bookingRepo: bookingRepo,
	}
}

func (u *ReviewUsecase) GetReview(ctx context.Context, id uuid.UUID) (*entity.Review, error) {
	return u.reviewRepo.GetByID(ctx, id)
}

func (u *ReviewUsecase) CreateReview(ctx context.Context, review *entity.Review) error {
	// Валидация бизнес-логики
	if review.BookingID == uuid.Nil {
		return errors.New("booking_id is required")
	}
	if _, err := u.bookingRepo.GetByID(ctx, review.BookingID); err != nil {
		return errors.New("invalid booking_id")
	}
	if review.Rating < 1 || review.Rating > 5 {
		return errors.New("rating must be between 1 and 5")
	}
	return u.reviewRepo.Create(ctx, review)
}

func (u *ReviewUsecase) UpdateReview(ctx context.Context, review *entity.Review) error {
	// Валидация бизнес-логики
	if review.BookingID == uuid.Nil {
		return errors.New("booking_id is required")
	}
	if _, err := u.bookingRepo.GetByID(ctx, review.BookingID); err != nil {
		return errors.New("invalid booking_id")
	}
	if review.Rating < 1 || review.Rating > 5 {
		return errors.New("rating must be between 1 and 5")
	}
	return u.reviewRepo.Update(ctx, review)
}

func (u *ReviewUsecase) DeleteReview(ctx context.Context, id uuid.UUID) error {
	return u.reviewRepo.Delete(ctx, id)
}
