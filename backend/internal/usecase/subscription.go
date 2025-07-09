package usecase

import (
	"context"
	"errors"
	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	"github.com/Vanv1k/BeautyTON/internal/domain/repository"
	"github.com/google/uuid"
)

type SubscriptionUsecase struct {
	subscriptionRepo repository.SubscriptionRepository
	userRepo         repository.UserRepository
}

func NewSubscriptionUsecase(subscriptionRepo repository.SubscriptionRepository, userRepo repository.UserRepository) *SubscriptionUsecase {
	return &SubscriptionUsecase{
		subscriptionRepo: subscriptionRepo,
		userRepo:         userRepo,
	}
}

func (u *SubscriptionUsecase) GetSubscription(ctx context.Context, id uuid.UUID) (*entity.Subscription, error) {
	return u.subscriptionRepo.GetByID(ctx, id)
}

func (u *SubscriptionUsecase) CreateSubscription(ctx context.Context, subscription *entity.Subscription) error {
	// Валидация бизнес-логики
	if subscription.ClientID == uuid.Nil || subscription.MasterID == uuid.Nil {
		return errors.New("client_id and master_id are required")
	}
	client, err := u.userRepo.GetByID(ctx, subscription.ClientID)
	if err != nil {
		return err
	}
	if client.Role != entity.UserRoleClient {
		return errors.New("client_id must refer to a client")
	}
	master, err := u.userRepo.GetByID(ctx, subscription.MasterID)
	if err != nil {
		return err
	}
	if master.Role != entity.UserRoleMaster {
		return errors.New("master_id must refer to a master")
	}
	return u.subscriptionRepo.Create(ctx, subscription)
}

func (u *SubscriptionUsecase) UpdateSubscription(ctx context.Context, subscription *entity.Subscription) error {
	// Валидация бизнес-логики
	if subscription.ClientID == uuid.Nil || subscription.MasterID == uuid.Nil {
		return errors.New("client_id and master_id are required")
	}
	client, err := u.userRepo.GetByID(ctx, subscription.ClientID)
	if err != nil {
		return err
	}
	if client.Role != entity.UserRoleClient {
		return errors.New("client_id must refer to a client")
	}
	master, err := u.userRepo.GetByID(ctx, subscription.MasterID)
	if err != nil {
		return err
	}
	if master.Role != entity.UserRoleMaster {
		return errors.New("master_id must refer to a master")
	}
	return u.subscriptionRepo.Update(ctx, subscription)
}

func (u *SubscriptionUsecase) DeleteSubscription(ctx context.Context, id uuid.UUID) error {
	return u.subscriptionRepo.Delete(ctx, id)
}
