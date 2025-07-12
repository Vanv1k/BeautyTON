package usecase

import (
	"context"
	"errors"

	"github.com/google/uuid"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	"github.com/Vanv1k/BeautyTON/internal/domain/repository"
)

type MyMasterUsecase struct {
	myMasterRepo repository.MyMasterRepository
	userRepo     repository.UserRepository
}

func NewMyMasterUsecase(myMasterRepo repository.MyMasterRepository, userRepo repository.UserRepository) *MyMasterUsecase {
	return &MyMasterUsecase{
		myMasterRepo: myMasterRepo,
		userRepo:     userRepo,
	}
}

func (u *MyMasterUsecase) GetMyMaster(ctx context.Context, id uuid.UUID) (*entity.MyMaster, error) {
	return u.myMasterRepo.GetByID(ctx, id)
}

func (u *MyMasterUsecase) CreateMyMaster(ctx context.Context, myMaster *entity.MyMaster) error {
	// Валидация бизнес-логики
	if myMaster.ClientID == uuid.Nil || myMaster.MasterID == uuid.Nil {
		return errors.New("client_id and master_id are required")
	}
	client, err := u.userRepo.GetByID(ctx, myMaster.ClientID)
	if err != nil {
		return err
	}
	if client.Role != entity.UserRoleClient {
		return errors.New("client_id must refer to a client")
	}
	master, err := u.userRepo.GetByID(ctx, myMaster.MasterID)
	if err != nil {
		return err
	}
	if master.Role != entity.UserRoleMaster {
		return errors.New("master_id must refer to a master")
	}
	return u.myMasterRepo.Create(ctx, myMaster)
}

func (u *MyMasterUsecase) UpdateMyMaster(ctx context.Context, myMaster *entity.MyMaster) error {
	// Валидация бизнес-логики
	if myMaster.ClientID == uuid.Nil || myMaster.MasterID == uuid.Nil {
		return errors.New("client_id and master_id are required")
	}
	client, err := u.userRepo.GetByID(ctx, myMaster.ClientID)
	if err != nil {
		return err
	}
	if client.Role != entity.UserRoleClient {
		return errors.New("client_id must refer to a client")
	}
	master, err := u.userRepo.GetByID(ctx, myMaster.MasterID)
	if err != nil {
		return err
	}
	if master.Role != entity.UserRoleMaster {
		return errors.New("master_id must refer to a master")
	}
	return u.myMasterRepo.Update(ctx, myMaster)
}

func (u *MyMasterUsecase) DeleteMyMaster(ctx context.Context, id uuid.UUID) error {
	return u.myMasterRepo.Delete(ctx, id)
}
