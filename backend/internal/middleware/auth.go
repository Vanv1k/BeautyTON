package middleware

import (
	"context"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/telegram-mini-apps/init-data-golang"

	"github.com/Vanv1k/BeautyTON/internal/usecase"
)

type TelegramAuthMiddlewareConfig struct {
	BotToken    string
	UserUsecase *usecase.UserUsecase
}

func TelegramAuthMiddleware(config *TelegramAuthMiddlewareConfig) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			authHeader := r.Header.Get("Authorization")
			if authHeader == "" {
				http.Error(w, "Authorization header missing", http.StatusUnauthorized)
				return
			}

			// Expect format: "tma <initData>"
			parts := strings.SplitN(authHeader, " ", 2)
			if len(parts) != 2 || parts[0] != "tma" {
				http.Error(w, "Invalid Authorization header format", http.StatusUnauthorized)
				return
			}
			initData := parts[1]

			if err := initdata.Validate(initData, config.BotToken, 24*time.Hour); err != nil {
				http.Error(w, fmt.Sprintf("Invalid initData: %v", err), http.StatusUnauthorized)
				return
			}

			query, err := initdata.Parse(initData)
			if err != nil {
				http.Error(w, fmt.Sprintf("Failed to parse initData: %v", err), http.StatusUnauthorized)
				return
			}

			user := query.User

			dbUser, err := config.UserUsecase.GetUserByTelegramID(r.Context(), user.ID)
			if err != nil {
				http.Error(w, "User not found or server error", http.StatusUnauthorized)
				return
			}

			ctx := context.WithValue(r.Context(), "telegram_user_id", user.ID)
			ctx = context.WithValue(ctx, "user_role", dbUser.Role)
			r = r.WithContext(ctx)

			next.ServeHTTP(w, r)
		})
	}
}

// RoleMiddleware ensures the user has the required role
func RoleMiddleware(requiredRole string) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			role, ok := r.Context().Value("user_role").(string)
			if !ok || role != requiredRole {
				http.Error(w, "Forbidden: insufficient permissions", http.StatusForbidden)
				return
			}
			next.ServeHTTP(w, r)
		})
	}
}
