package repository

import "github.com/Vanv1k/BeautyTON/internal/domain/entity"

type UserRepository interface {
	GetByID(id int) (*entity.User, error)
	Create(user *entity.User) error
}
