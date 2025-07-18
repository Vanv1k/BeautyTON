package router

import (
	"net/http"

	"github.com/gorilla/mux"
	httpSwagger "github.com/swaggo/http-swagger"

	"github.com/Vanv1k/BeautyTON/internal/infrastructure/http/handler"
)

var allowedOrigins = map[string]bool{
	"http://localhost:3000":     true,
	"dev.miniapp.beautyton.com": true,
	"miniapp.beautyton.com ":    true,
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")

		if allowedOrigins[origin] {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Vary", "Origin")
		}

		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func NewRouter(
	userHandler *handler.UserHandler,
	userPreferencesHandler *handler.UserPreferencesHandler,
	masterProfileHandler *handler.MasterProfileHandler,
	subscriptionHandler *handler.SubscriptionHandler,
	myMasterHandler *handler.MyMasterHandler,
	serviceHandler *handler.ServiceHandler,
	serviceCategoryHandler *handler.ServiceCategoryHandler,
	bookingHandler *handler.BookingHandler,
	scheduleSlotHandler *handler.ScheduleSlotHandler,
	reviewHandler *handler.ReviewHandler,
	paymentHandler *handler.PaymentHandler,
	cityHandler *handler.CityHandler,
	countryHandler *handler.CountryHandler,
	fileHandler *handler.FileHandler,
) *mux.Router {
	router := mux.NewRouter()

	router.Use(corsMiddleware)

	// User routes
	router.HandleFunc("/users/{id}", userHandler.GetUser).Methods("GET", "OPTIONS")
	router.HandleFunc("/users", userHandler.CreateUser).Methods("POST", "OPTIONS")
	router.HandleFunc("/users/{id}", userHandler.UpdateUser).Methods("PUT", "OPTIONS")
	router.HandleFunc("/users/{id}", userHandler.DeleteUser).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/users/{id}/photo", userHandler.UploadUserPhoto).Methods("POST", "OPTIONS")

	// UserPreferences routes
	router.HandleFunc("/user_preferences/{id}", userPreferencesHandler.GetUserPreferences).Methods("GET", "OPTIONS")
	router.HandleFunc("/user_preferences", userPreferencesHandler.CreateUserPreferences).Methods("POST", "OPTIONS")
	router.HandleFunc("/user_preferences/{id}", userPreferencesHandler.UpdateUserPreferences).Methods("PUT", "OPTIONS")
	router.HandleFunc("/user_preferences/{id}", userPreferencesHandler.DeleteUserPreferences).Methods("DELETE", "OPTIONS")

	// MasterProfile routes
	router.HandleFunc("/master_profiles/{id}", masterProfileHandler.GetMasterProfile).Methods("GET", "OPTIONS")
	router.HandleFunc("/master_profiles", masterProfileHandler.ListProfiles).Methods("GET", "OPTIONS")
	router.HandleFunc("/master_profiles", masterProfileHandler.CreateMasterProfile).Methods("POST", "OPTIONS")
	router.HandleFunc("/master_profiles/{id}", masterProfileHandler.UpdateMasterProfile).Methods("PUT", "OPTIONS")
	router.HandleFunc("/master_profiles/{id}", masterProfileHandler.DeleteMasterProfile).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/master_profiles/{id}/rating", masterProfileHandler.UpdateMasterProfileRating).Methods("PUT", "OPTIONS")

	// Subscription routes
	router.HandleFunc("/subscriptions/{id}", subscriptionHandler.GetSubscription).Methods("GET", "OPTIONS")
	router.HandleFunc("/subscriptions", subscriptionHandler.CreateSubscription).Methods("POST", "OPTIONS")
	router.HandleFunc("/subscriptions/{id}", subscriptionHandler.UpdateSubscription).Methods("PUT", "OPTIONS")
	router.HandleFunc("/subscriptions/{id}", subscriptionHandler.DeleteSubscription).Methods("DELETE", "OPTIONS")

	// MyMaster routes
	router.HandleFunc("/my_masters/{id}", myMasterHandler.GetMyMaster).Methods("GET", "OPTIONS")
	router.HandleFunc("/my_masters", myMasterHandler.CreateMyMaster).Methods("POST", "OPTIONS")
	router.HandleFunc("/my_masters/{id}", myMasterHandler.UpdateMyMaster).Methods("PUT", "OPTIONS")
	router.HandleFunc("/my_masters/{id}", myMasterHandler.DeleteMyMaster).Methods("DELETE", "OPTIONS")

	// Service routes
	router.HandleFunc("/services/{id}", serviceHandler.GetService).Methods("GET", "OPTIONS")
	router.HandleFunc("/services", serviceHandler.CreateService).Methods("POST", "OPTIONS")
	router.HandleFunc("/services/{id}", serviceHandler.UpdateService).Methods("PUT", "OPTIONS")
	router.HandleFunc("/services/{id}", serviceHandler.DeleteService).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/services/{id}/photo", serviceHandler.UploadServicePhoto).Methods("POST", "OPTIONS")

	// ServiceCategory routes
	router.HandleFunc("/service_categories/{id}", serviceCategoryHandler.GetServiceCategory).Methods("GET", "OPTIONS")
	router.HandleFunc("/service_categories", serviceCategoryHandler.CreateServiceCategory).Methods("POST", "OPTIONS")
	router.HandleFunc("/service_categories/{id}", serviceCategoryHandler.UpdateServiceCategory).Methods("PUT", "OPTIONS")
	router.HandleFunc("/service_categories/{id}", serviceCategoryHandler.DeleteServiceCategory).Methods("DELETE", "OPTIONS")

	// Booking routes
	router.HandleFunc("/bookings/{id}", bookingHandler.GetBooking).Methods("GET", "OPTIONS")
	router.HandleFunc("/bookings", bookingHandler.CreateBooking).Methods("POST", "OPTIONS")
	router.HandleFunc("/bookings/{id}", bookingHandler.UpdateBooking).Methods("PUT", "OPTIONS")
	router.HandleFunc("/bookings/{id}", bookingHandler.DeleteBooking).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/bookings/{id}/status", bookingHandler.UpdateBookingStatus).Methods("PUT", "OPTIONS")

	// ScheduleSlot routes
	router.HandleFunc("/schedule_slots/{id}", scheduleSlotHandler.GetScheduleSlot).Methods("GET", "OPTIONS")
	router.HandleFunc("/schedule_slots", scheduleSlotHandler.ListScheduleSlots).Methods("GET", "OPTIONS")
	router.HandleFunc("/schedule_slots", scheduleSlotHandler.CreateScheduleSlot).Methods("POST", "OPTIONS")
	router.HandleFunc("/schedule_slots/{id}", scheduleSlotHandler.UpdateScheduleSlot).Methods("PUT", "OPTIONS")
	router.HandleFunc("/schedule_slots/{id}", scheduleSlotHandler.DeleteScheduleSlot).Methods("DELETE", "OPTIONS")

	// Review routes
	router.HandleFunc("/reviews/{id}", reviewHandler.GetReview).Methods("GET", "OPTIONS")
	router.HandleFunc("/reviews", reviewHandler.CreateReview).Methods("POST", "OPTIONS")
	router.HandleFunc("/reviews/{id}", reviewHandler.UpdateReview).Methods("PUT", "OPTIONS")
	router.HandleFunc("/reviews/{id}", reviewHandler.DeleteReview).Methods("DELETE", "OPTIONS")

	// Payment routes
	router.HandleFunc("/payments/{id}", paymentHandler.GetPayment).Methods("GET", "OPTIONS")
	router.HandleFunc("/payments", paymentHandler.CreatePayment).Methods("POST", "OPTIONS")
	router.HandleFunc("/payments/{id}", paymentHandler.UpdatePayment).Methods("PUT", "OPTIONS")
	//router.HandleFunc("/payments/{id}", paymentHandler.DeletePayment).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/payments/{id}/status", paymentHandler.UpdatePaymentStatus).Methods("PUT", "OPTIONS")

	// City routes
	router.HandleFunc("/cities/{id}", cityHandler.GetCity).Methods("GET", "OPTIONS")
	router.HandleFunc("/cities", cityHandler.ListCities).Methods("GET", "OPTIONS")
	router.HandleFunc("/cities", cityHandler.CreateCity).Methods("POST", "OPTIONS")
	router.HandleFunc("/cities/{id}", cityHandler.UpdateCity).Methods("PUT", "OPTIONS")
	router.HandleFunc("/cities/{id}", cityHandler.DeleteCity).Methods("DELETE", "OPTIONS")

	// Country routes
	router.HandleFunc("/countries/{id}", countryHandler.GetCountry).Methods("GET", "OPTIONS")
	router.HandleFunc("/countries", countryHandler.CreateCountry).Methods("POST", "OPTIONS")
	router.HandleFunc("/countries/{id}", countryHandler.UpdateCountry).Methods("PUT", "OPTIONS")
	router.HandleFunc("/countries/{id}", countryHandler.DeleteCountry).Methods("DELETE", "OPTIONS")

	// File routes
	router.HandleFunc("/files/{id}", fileHandler.GetFile).Methods("GET", "OPTIONS")
	router.HandleFunc("/files", fileHandler.UploadFile).Methods("POST", "OPTIONS")

	// Swagger routes
	router.PathPrefix("/swagger/").Handler(httpSwagger.WrapHandler)

	return router
}
