package entity

type PaymentType string
type PaymentStatus string
type BookingStatus string
type ScheduleSlotStatus string
type SlotType string
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

	ScheduleSlotStatusBooked   ScheduleSlotStatus = "booked"
	ScheduleSlotStatusFree     ScheduleSlotStatus = "free"
	ScheduleSlotStatusBusy     ScheduleSlotStatus = "busy"
	ScheduleSlotStatusReserved ScheduleSlotStatus = "reserved"

	SlotManual SlotType = "manual"
	SlotAuto   SlotType = "auto"

	UserRoleMaster UserRole = "master"
	UserRoleClient UserRole = "client"
)
