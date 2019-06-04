# Open Table Reservation Module

> Open Table reservations module as part of the entire webapp.

## Related Projects

- https://github.com/krummurk/photos-module
- https://github.com/krummurk/customer-reviews
- https://github.com/krummurk/textDetails_module
- https://github.com/krummurk/reservations-proxy

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
1. [CRUD Operations](#CRUD)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

npm install
//run mysql schema file: mysql -u root -p < ./database/sql-scripts/schema.sql
npm run react-dev
npm run server

//server runs on port 3010

## CRUD

| API Endpoints      | Request Type | Input         | Output                                                                       | Description                                         |
| ------------------ | ------------ | ------------- | ---------------------------------------------------------------------------- | --------------------------------------------------- |
| /API/restaurant/id | GET          | Restaurant ID | Restaurant doc with time searched and whether or not the resaurant is booked | Gets corresponding restaurant's booking information |
| /API/restaurant/id | PATCH        | Restaurant ID | Status Code : 200                                                            | Updates Restaurant Doc                              |
