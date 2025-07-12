package usecase

import (
	"context"
	"errors"
	"io"

	"github.com/google/uuid"

	"github.com/Vanv1k/BeautyTON/internal/domain/entity"
	"github.com/Vanv1k/BeautyTON/internal/domain/repository"
)

type UserUsecase struct {
	userRepo repository.UserRepository
	fileRepo repository.FileRepository
}

func NewUserUsecase(userRepo repository.UserRepository, fileRepo repository.FileRepository) *UserUsecase {
	return &UserUsecase{userRepo: userRepo, fileRepo: fileRepo}
}

func (u *UserUsecase) GetUser(ctx context.Context, id uuid.UUID) (*entity.User, error) {
	return u.userRepo.GetByID(ctx, id)
}

func (u *UserUsecase) CreateUser(ctx context.Context, user *entity.User) error {
	// Валидация бизнес-логики
	if user.Role != entity.UserRoleMaster && user.Role != entity.UserRoleClient {
		return errors.New("invalid user role")
	}
	if user.Username == "" {
		return errors.New("username cannot be empty")
	}
	if user.CityID == uuid.Nil {
		return errors.New("city_id is required")
	}
	return u.userRepo.Create(ctx, user)
}

func (u *UserUsecase) UpdateUser(ctx context.Context, user *entity.User) error {
	// Валидация бизнес-логики
	if user.Role != entity.UserRoleMaster && user.Role != entity.UserRoleClient {
		return errors.New("invalid user role")
	}
	if user.Username == "" {
		return errors.New("username cannot be empty")
	}
	if user.CityID == uuid.Nil {
		return errors.New("city_id is required")
	}
	return u.userRepo.Update(ctx, user)
}

func (u *UserUsecase) DeleteUser(ctx context.Context, id uuid.UUID) error {
	return u.userRepo.Delete(ctx, id)
}

func (u *UserUsecase) UploadUserPhoto(ctx context.Context, userID uuid.UUID, file *entity.File, content io.Reader) error {
	// Проверяем, существует ли пользователь
	user, err := u.userRepo.GetByID(ctx, userID)
	if err != nil {
		return err
	}
	// Загружаем файл в S3
	if err := u.fileRepo.Upload(ctx, file, content); err != nil {
		return err
	}
	// Обновляем PhotoURL
	user.PhotoURL = file.ID
	return u.userRepo.Update(ctx, user)
}
