package usecase

import (
	"context"
	"errors"
	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	"github.com/Vanv1k/BeautyTON/internal/domain/repository"
	"github.com/google/uuid"
)

type MasterProfileUsecase struct {
	masterProfileRepo repository.MasterProfileRepository
	userRepo          repository.UserRepository
}

func NewMasterProfileUsecase(masterProfileRepo repository.MasterProfileRepository, userRepo repository.UserRepository) *MasterProfileUsecase {
	return &MasterProfileUsecase{masterProfileRepo: masterProfileRepo, userRepo: userRepo}
}

func (u *MasterProfileUsecase) GetMasterProfile(ctx context.Context, id uuid.UUID) (*entity.MasterProfile, error) {
	return u.masterProfileRepo.GetByID(ctx, id)
}

func (u *MasterProfileUsecase) CreateMasterProfile(ctx context.Context, profile *entity.MasterProfile) error {
	// Валидация бизнес-логики
	if profile.UserID != nil {
		user, err := u.userRepo.GetByID(ctx, *profile.UserID)
		if err != nil {
			return err
		}
		if user.Role != entity.UserRoleMaster {
			return errors.New("user must have master role")
		}
	}
	if profile.QRCode == "" {
		return errors.New("qr_code is required")
	}
	if profile.Rating < 0 || profile.Rating > 5 {
		return errors.New("rating must be between 0 and 5")
	}
	return u.masterProfileRepo.Create(ctx, profile)
}

func (u *MasterProfileUsecase) UpdateMasterProfile(ctx context.Context, profile *entity.MasterProfile) error {
	// Валидация бизнес-логики
	if profile.UserID != nil {
		user, err := u.userRepo.GetByID(ctx, *profile.UserID)
		if err != nil {
			return err
		}
		if user.Role != entity.UserRoleMaster {
			return errors.New("user must have master role")
		}
	}
	if profile.QRCode == "" {
		return errors.New("qr_code is required")
	}
	if profile.Rating < 0 || profile.Rating > 5 {
		return errors.New("rating must be between 0 and 5")
	}
	return u.masterProfileRepo.Update(ctx, profile)
}

func (u *MasterProfileUsecase) UpdateMasterProfileRating(ctx context.Context, id uuid.UUID, rating float64) (*entity.MasterProfile, error) {
	// Валидация бизнес-логики
	if rating < 0 || rating > 5 {
		return nil, errors.New("rating must be between 0 and 5")
	}
	profile, err := u.masterProfileRepo.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	profile.Rating = rating
	if err := u.masterProfileRepo.Update(ctx, profile); err != nil {
		return nil, err
	}
	return profile, nil
}

func (u *MasterProfileUsecase) DeleteMasterProfile(ctx context.Context, id uuid.UUID) error {
	return u.masterProfileRepo.Delete(ctx, id)
}
