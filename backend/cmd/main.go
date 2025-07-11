package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/Vanv1k/BeautyTON/internal/config"
	"github.com/Vanv1k/BeautyTON/internal/infrastructure/database/postgres"
	"github.com/Vanv1k/BeautyTON/internal/infrastructure/http/handler"
	"github.com/Vanv1k/BeautyTON/internal/infrastructure/http/router"
	"github.com/Vanv1k/BeautyTON/internal/infrastructure/storage/s3"
	"github.com/Vanv1k/BeautyTON/internal/usecase"
)

func main() {
	cfg := config.Load()

	pg, err := postgres.NewPostgresRepo(cfg.Postgres)
	if err != nil {
		panic(fmt.Errorf("failed to init postgres: %w", err))
	}

	fileRepo, err := s3.NewFileRepository(cfg.S3)
	if err != nil {
		panic(fmt.Errorf("failed to init s3: %w", err))
	}

	// TODO: use google wire to move dependencies
	userRepo := postgres.NewUserRepository(pg)
	userPreferencesRepo := postgres.NewUserPreferencesRepository(pg)
	masterProfileRepo := postgres.NewMasterProfileRepository(pg)
	subscriptionRepo := postgres.NewSubscriptionRepository(pg)
	myMasterRepo := postgres.NewMyMasterRepository(pg)
	serviceRepo := postgres.NewServiceRepository(pg)
	serviceCategoryRepo := postgres.NewServiceCategoryRepository(pg)
	bookingRepo := postgres.NewBookingRepository(pg)
	reviewRepo := postgres.NewReviewRepository(pg)
	paymentRepo := postgres.NewPaymentRepository(pg)
	cityRepo := postgres.NewCityRepository(pg)
	countryRepo := postgres.NewCountryRepository(pg)

	userUsecase := usecase.NewUserUsecase(userRepo, fileRepo)
	userPreferencesUsecase := usecase.NewUserPreferencesUsecase(userPreferencesRepo, userRepo, serviceCategoryRepo)
	masterProfileUsecase := usecase.NewMasterProfileUsecase(masterProfileRepo, userRepo)
	subscriptionUsecase := usecase.NewSubscriptionUsecase(subscriptionRepo, userRepo)
	myMasterUsecase := usecase.NewMyMasterUsecase(myMasterRepo, userRepo)
	serviceUsecase := usecase.NewServiceUsecase(serviceRepo, userRepo, serviceCategoryRepo, fileRepo)
	serviceCategoryUsecase := usecase.NewServiceCategoryUsecase(serviceCategoryRepo)
	bookingUsecase := usecase.NewBookingUsecase(bookingRepo, userRepo, serviceRepo)
	reviewUsecase := usecase.NewReviewUsecase(reviewRepo, bookingRepo)
	paymentUsecase := usecase.NewPaymentUsecase(paymentRepo, userRepo)
	cityUsecase := usecase.NewCityUsecase(cityRepo, countryRepo)
	countryUsecase := usecase.NewCountryUsecase(countryRepo)
	fileUsecase := usecase.NewFileUsecase(fileRepo)

	userHandler := handler.NewUserHandler(userUsecase)
	userPreferencesHandler := handler.NewUserPreferencesHandler(userPreferencesUsecase)
	masterProfileHandler := handler.NewMasterProfileHandler(masterProfileUsecase)
	subscriptionHandler := handler.NewSubscriptionHandler(subscriptionUsecase)
	myMasterHandler := handler.NewMyMasterHandler(myMasterUsecase)
	serviceHandler := handler.NewServiceHandler(serviceUsecase)
	serviceCategoryHandler := handler.NewServiceCategoryHandler(serviceCategoryUsecase)
	bookingHandler := handler.NewBookingHandler(bookingUsecase)
	reviewHandler := handler.NewReviewHandler(reviewUsecase)
	paymentHandler := handler.NewPaymentHandler(paymentUsecase)
	cityHandler := handler.NewCityHandler(cityUsecase)
	countryHandler := handler.NewCountryHandler(countryUsecase)
	fileHandler := handler.NewFileHandler(fileUsecase)

	// Инициализация роутера
	r := router.NewRouter(
		userHandler,
		userPreferencesHandler,
		masterProfileHandler,
		subscriptionHandler,
		myMasterHandler,
		serviceHandler,
		serviceCategoryHandler,
		bookingHandler,
		reviewHandler,
		paymentHandler,
		cityHandler,
		countryHandler,
		fileHandler,
	)

	// Запуск сервера
	server := &http.Server{
		Addr:         fmt.Sprintf(":%v", cfg.Port),
		Handler:      r,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}
	fmt.Printf("Starting server on :8080\n")
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		panic(fmt.Errorf("failed to start server: %w", err))
	}
}
