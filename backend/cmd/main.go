package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {
	http.HandleFunc("/ping", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, "pong 18")
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Запасной порт, если переменная PORT не задана
	}

	fmt.Println("Server running on :8080")
	http.ListenAndServe(":8080", nil)
}
