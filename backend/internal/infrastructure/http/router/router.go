package router

import (
	"github.com/gorilla/mux"
	httpSwagger "github.com/swaggo/http-swagger"

	"github.com/Vanv1k/BeautyTON/internal/infrastructure/http/handler"
)

func NewRouter(
	userHandler *handler.UserHandler,
	userPreferencesHandler *handler.UserPreferencesHandler,
	masterProfileHandler *handler.MasterProfileHandler,
	subscriptionHandler *handler.SubscriptionHandler,
	myMasterHandler *handler.MyMasterHandler,
	serviceHandler *handler.ServiceHandler,
	serviceCategoryHandler *handler.ServiceCategoryHandler,
	bookingHandler *handler.BookingHandler,
	reviewHandler *handler.ReviewHandler,
	paymentHandler *handler.PaymentHandler,
	cityHandler *handler.CityHandler,
	countryHandler *handler.CountryHandler,
	fileHandler *handler.FileHandler,
) *mux.Router {
	router := mux.NewRouter()

	// User routes
	router.HandleFunc("/users/{id}", userHandler.GetUser).Methods("GET")
	router.HandleFunc("/users", userHandler.CreateUser).Methods("POST")
	router.HandleFunc("/users/{id}", userHandler.UpdateUser).Methods("PUT")
	router.HandleFunc("/users/{id}", userHandler.DeleteUser).Methods("DELETE")
	router.HandleFunc("/users/{id}/photo", userHandler.UploadUserPhoto).Methods("POST")

	// UserPreferences routes
	router.HandleFunc("/user_preferences/{id}", userPreferencesHandler.GetUserPreferences).Methods("GET")
	router.HandleFunc("/user_preferences", userPreferencesHandler.CreateUserPreferences).Methods("POST")
	router.HandleFunc("/user_preferences/{id}", userPreferencesHandler.UpdateUserPreferences).Methods("PUT")
	router.HandleFunc("/user_preferences/{id}", userPreferencesHandler.DeleteUserPreferences).Methods("DELETE")

	// MasterProfile routes
	router.HandleFunc("/master_profiles/{id}", masterProfileHandler.GetMasterProfile).Methods("GET")
	router.HandleFunc("/master_profiles", masterProfileHandler.CreateMasterProfile).Methods("POST")
	router.HandleFunc("/master_profiles/{id}", masterProfileHandler.UpdateMasterProfile).Methods("PUT")
	router.HandleFunc("/master_profiles/{id}", masterProfileHandler.DeleteMasterProfile).Methods("DELETE")
	router.HandleFunc("/master_profiles/{id}/rating", masterProfileHandler.UpdateMasterProfileRating).Methods("PUT")

	// Subscription routes
	router.HandleFunc("/subscriptions/{id}", subscriptionHandler.GetSubscription).Methods("GET")
	router.HandleFunc("/subscriptions", subscriptionHandler.CreateSubscription).Methods("POST")
	router.HandleFunc("/subscriptions/{id}", subscriptionHandler.UpdateSubscription).Methods("PUT")
	router.HandleFunc("/subscriptions/{id}", subscriptionHandler.DeleteSubscription).Methods("DELETE")

	// MyMaster routes
	router.HandleFunc("/my_masters/{id}", myMasterHandler.GetMyMaster).Methods("GET")
	router.HandleFunc("/my_masters", myMasterHandler.CreateMyMaster).Methods("POST")
	router.HandleFunc("/my_masters/{id}", myMasterHandler.UpdateMyMaster).Methods("PUT")
	router.HandleFunc("/my_masters/{id}", myMasterHandler.DeleteMyMaster).Methods("DELETE")

	// Service routes
	router.HandleFunc("/services/{id}", serviceHandler.GetService).Methods("GET")
	router.HandleFunc("/services", serviceHandler.CreateService).Methods("POST")
	router.HandleFunc("/services/{id}", serviceHandler.UpdateService).Methods("PUT")
	router.HandleFunc("/services/{id}", serviceHandler.DeleteService).Methods("DELETE")
	router.HandleFunc("/services/{id}/photo", serviceHandler.UploadServicePhoto).Methods("POST")

	// ServiceCategory routes
	router.HandleFunc("/service_categories/{id}", serviceCategoryHandler.GetServiceCategory).Methods("GET")
	router.HandleFunc("/service_categories", serviceCategoryHandler.CreateServiceCategory).Methods("POST")
	router.HandleFunc("/service_categories/{id}", serviceCategoryHandler.UpdateServiceCategory).Methods("PUT")
	router.HandleFunc("/service_categories/{id}", serviceCategoryHandler.DeleteServiceCategory).Methods("DELETE")

	// Booking routes
	router.HandleFunc("/bookings/{id}", bookingHandler.GetBooking).Methods("GET")
	router.HandleFunc("/bookings", bookingHandler.CreateBooking).Methods("POST")
	router.HandleFunc("/bookings/{id}", bookingHandler.UpdateBooking).Methods("PUT")
	router.HandleFunc("/bookings/{id}", bookingHandler.DeleteBooking).Methods("DELETE")
	router.HandleFunc("/bookings/{id}/status", bookingHandler.UpdateBookingStatus).Methods("PUT")

	// Review routes
	router.HandleFunc("/reviews/{id}", reviewHandler.GetReview).Methods("GET")
	router.HandleFunc("/reviews", reviewHandler.CreateReview).Methods("POST")
	router.HandleFunc("/reviews/{id}", reviewHandler.UpdateReview).Methods("PUT")
	router.HandleFunc("/reviews/{id}", reviewHandler.DeleteReview).Methods("DELETE")

	// Payment routes
	router.HandleFunc("/payments/{id}", paymentHandler.GetPayment).Methods("GET")
	router.HandleFunc("/payments", paymentHandler.CreatePayment).Methods("POST")
	router.HandleFunc("/payments/{id}", paymentHandler.UpdatePayment).Methods("PUT")
	// router.HandleFunc("/payments/{id}", paymentHandler.DeletePayment).Methods("DELETE")
	router.HandleFunc("/payments/{id}/status", paymentHandler.UpdatePaymentStatus).Methods("PUT")

	// City routes
	router.HandleFunc("/cities/{id}", cityHandler.GetCity).Methods("GET")
	router.HandleFunc("/cities", cityHandler.CreateCity).Methods("POST")
	router.HandleFunc("/cities/{id}", cityHandler.UpdateCity).Methods("PUT")
	router.HandleFunc("/cities/{id}", cityHandler.DeleteCity).Methods("DELETE")

	// Country routes
	router.HandleFunc("/countries/{id}", countryHandler.GetCountry).Methods("GET")
	router.HandleFunc("/countries", countryHandler.CreateCountry).Methods("POST")
	router.HandleFunc("/countries/{id}", countryHandler.UpdateCountry).Methods("PUT")
	router.HandleFunc("/countries/{id}", countryHandler.DeleteCountry).Methods("DELETE")

	// File routes
	router.HandleFunc("/files/{id}", fileHandler.GetFile).Methods("GET")
	router.HandleFunc("/files", fileHandler.UploadFile).Methods("POST")

	// Swagger routes
	router.PathPrefix("/swagger/").Handler(httpSwagger.WrapHandler)

	return router
}
