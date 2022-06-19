package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/rs/cors"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

const (
	user     = "postgres"
	host     = "localhost"
	database = "storage"
	password = "7637"
	port     = 5432
)

type Hotel struct {
	Id          int    `json:"id"`
	Name        string `json:"name"`
	Location    string `json:"location"`
	Price_range string `json:"price_range"`
}

type Hotels struct {
	Hotels []Hotel `json:"Hotels"`
}

type JsonResponse struct {
	Status string `json:"status"`
	Data   Hotels `json:"data"`
}

func setupDB() *sql.DB {

	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s  sslmode=disable", host, port, user, password, database)
	db, err := sql.Open("postgres", psqlInfo)

	if err != nil { // if there is an error opening the connection, handle it
		log.Println("error opening connection to database")
		log.Println(err)
		return nil
	}

	return db
}

func main() {

	handleRequests()

}

func handleRequests() {

	router := mux.NewRouter()

	//Get all Hotels
	router.HandleFunc("/api/v1/hotels", GetAllHotels).Methods("GET")

	//Get a Hotel by ID
	router.HandleFunc("/api/v1/hotels/{id}", GetHotel).Methods("GET")

	//create a new hotel
	router.HandleFunc("/api/v1/hotels", CreateHotel).Methods("POST")

	//update a hotel by id
	router.HandleFunc("/api/v1/hotels/{id}", UpdateHotel).Methods("PUT")

	//delete a hotel by id
	router.HandleFunc("/api/v1/hotels/{id}", DeleteHotel).Methods("DELETE")

	//CORS
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowCredentials: true,
	})

	// serve the app

	// load .env file
	if err := godotenv.Load(".env"); err != nil {
		log.Fatalf("Error loading .env file")
	}
	myport := os.Getenv("PORT")

	fmt.Printf("server is up and listening on port %s \n", myport)

	if error := http.ListenAndServe(":"+myport, c.Handler(router)); error != nil {
		fmt.Println(error)
		return
	}

}

func GetAllHotels(w http.ResponseWriter, r *http.Request) {

	db := setupDB()

	if db == nil {
		log.Println("Error connecting to database")
		return
	}

	// Get all hotels
	results, err := db.Query("SELECT * FROM hotels")

	if err != nil {
		log.Println(err)
	}

	// var response []JsonResponse
	var hotels []Hotel

	// Foreach movie
	for results.Next() {
		var (
			id          int
			name        string
			location    string
			price_range string
		)

		err = results.Scan(&id, &name, &location, &price_range)

		if err != nil {
			log.Println(err)
		}

		hotels = append(hotels, Hotel{Id: id, Name: name, Location: location, Price_range: price_range})
	}

	var myresponse = JsonResponse{Status: "success", Data: Hotels{Hotels: hotels}}
	json.NewEncoder(w).Encode(myresponse)
}

func GetHotel(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	db := setupDB()

	if db == nil {
		log.Println("Error connecting to database")
		return
	}

	params := mux.Vars(r)

	h_id := params["id"]

	//Get a Hotel
	results, err := db.Query("SELECT * FROM hotels where id=$1", h_id)

	if err != nil {
		log.Println(err)
	}

	// var response []JsonResponse
	var hotels []Hotel

	// Foreach movie
	for results.Next() {
		var (
			id          int
			name        string
			location    string
			price_range string
		)

		err = results.Scan(&id, &name, &location, &price_range)

		if err != nil {
			log.Println(err)
		}

		hotels = append(hotels, Hotel{Id: id, Name: name, Location: location, Price_range: price_range})
	}

	var myresponse = JsonResponse{Status: "success", Data: Hotels{Hotels: hotels}}
	json.NewEncoder(w).Encode(myresponse)
}

func CreateHotel(w http.ResponseWriter, r *http.Request) {

	err := r.ParseMultipartForm(32 << 20) // maxMemory 32MB
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	file, h, err := r.FormFile("File")
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	counter := 0

	_, err = os.Stat("./images/" + h.Filename)

	for err == nil { //file exists
		counter++
		_, err = os.Stat("./images/" + strconv.Itoa(counter) + h.Filename)
	}
	s := ""
	if counter != 0 {
		s = strconv.Itoa(counter)
	}

	tmpfile, err := os.Create("./images/" + s + h.Filename)
	defer tmpfile.Close()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	addr := "./images/" + s + h.Filename

	_, err = io.Copy(tmpfile, file)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	db := setupDB() // connect to the database
	if db == nil {
		log.Println("Error connecting to database")
		return
	}

	var m_id int
	erro := db.QueryRow("INSERT INTO hotels(name, location, price_range) VALUES($1, $2, $3) returning id;", r.FormValue("Name"), r.FormValue("Location"), r.FormValue("PriceRange")).Scan(&m_id)
	if erro != nil { // if there is an error, handle it
		log.Println(erro)
	}

	var hotels []Hotel

	hotels = append(hotels, Hotel{Id: m_id, Name: r.FormValue("Name"), Location: r.FormValue("Location"), Price_range: r.FormValue("PriceRange")})
	var myresponse = JsonResponse{Status: "success", Data: Hotels{Hotels: hotels}}
	json.NewEncoder(w).Encode(myresponse)
}

func UpdateHotel(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	var h Hotel
	err := json.NewDecoder(r.Body).Decode(&h)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	params := mux.Vars(r)
	h_id := params["id"]

	db := setupDB() // connect to the database
	if db == nil {
		log.Println("Error connecting to database")
		return
	}

	_, erro := db.Exec("UPDATE hotels SET name = $1 , location = $2 , price_range = $3 WHERE id = $4 returning id;", h.Name, h.Location, h.Price_range, h_id)
	if erro != nil { // if there is an error, handle it
		log.Println(err)
		return
	}

	w.WriteHeader(http.StatusOK)

	var myresponse = JsonResponse{Status: "success"}
	json.NewEncoder(w).Encode(myresponse)

}

func DeleteHotel(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)

	id := params["id"]

	var response = JsonResponse{}

	db := setupDB() // connect to the database

	if db == nil {
		log.Println("Error connecting to database")
		return
	}

	// Delete a hotel
	_, err := db.Exec("DELETE FROM hotels WHERE id=$1", id)

	if err != nil {
		log.Println(err)
	}

	response.Status = "success"
	json.NewEncoder(w).Encode(response)
}
