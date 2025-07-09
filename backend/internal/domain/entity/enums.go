package entity

type PaymentType string
type PaymentStatus string
type BookingStatus string
type UserRole string

const (
	PaymentTypePayment PaymentType = "payment"
	PaymentTypeTip     PaymentType = "tip"

	PaymentStatusPending   PaymentStatus = "pending"
	PaymentStatusCompleted PaymentStatus = "completed"
	PaymentStatusFailed    PaymentStatus = "failed"

	BookingStatusPending   BookingStatus = "pending"
	BookingStatusConfirmed BookingStatus = "confirmed"
	BookingStatusCompleted BookingStatus = "completed"
	BookingStatusCanceled  BookingStatus = "canceled"

	UserRoleMaster UserRole = "master"
	UserRoleClient UserRole = "client"
)
