package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/ping", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, "pong 11")
	})

	fmt.Println("Server running on :8080")
	http.ListenAndServe(":8080", nil)
}
