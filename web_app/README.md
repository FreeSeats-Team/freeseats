# FreeSeats Web App

## Web Application for FreeSeats

Server-side functionality will allow for CRUD operations to cloud database (MongoDB Atlas) through an API (in progress).

Client-side functional will allow for users to view availability of chairs in different study spaces (in progress). 

## Setup & Run

Server
```
$ cd freeseats-web-app
$ cd server
$ yarn install
$ nodemon index.js
```

```
$ cd freeseats-web-app
$ cd client
$ yarn install
$ yarn start
```
## API Deployed Endpoint

`https://freeseats-a3.herokuapp.com/`

## API Docs

| Path | Type | Parameters | Return | Description |
| :--- | :--- | :--- | :--- | :--- |
| `api/freeseats/create_hub` | `POST` | `_id`: hub_id , `seats`: [seat ...]  | `Status` | create_hub will add a new hub to the cloud database |
| `api/freeseats/create_seats` | `POST` | `hub_id`: hub_id , `seats`: [seat ...]  | `Status` | create_seats will add a new seats to an existing hub |
| `api/freeseats/update_seats` | `POST` | `hub_id`: hub_id , `seat_updates`: [seat ...]  | `Status` | update_seats updates the status of a list of seats |
| `api/freeseats/delete-hub` | `POST` | `hub_id`: hub_id | `Status` | delete_hub will delete hub based on hub_id |
| `api/freeseats/delete-seats` | `POST` | `hub_id`: hub_id , `seats`: [seat_id ...]  | `Status` | delete_hub will delete seats from a hub based on seat_id's |
| `api/freeseats/get_free_seats` | `GET` | Query param: `hub_id`: hub_id  | `status`: Status, `data`: Array of all seats which has occupied value of false | getFreeSeats will return an array of the free seats given a hub_id as a request query parameter |

### API Use Examples (Import in Postman) 
[postman_link]()