# Home Library Service

The Home Library Service is a REST API designed for managing users, artists, tracks, albums, and favorites. Users can add and remove artists, albums, and tracks to their own favorites list.

## Resources

The API provides REST endpoints to work with the following resources:

- **User** - user management
- **Artist** - artist management
- **Album** - album management
- **Track** - track management
- **Favorites** - favorite items management

## Installation and Setup

### Prerequisites

To run this project, ensure that you have:

- Node.js (version 22.x or higher)
- npm (version 6.x or higher)

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory of the project and add the following variable:

```env
PORT=4000
```

### Running the Service

To start the service, use the following command:

```bash
npm start
```

By default, the service will listen on port `4000`.

### Running in Development Mode

To start the service in development mode with auto-reload (using `nodemon`):

```bash
npm run dev
```

### Testing

This project includes unit and integration tests. To run the tests, run the app (in case if the application is not running)

```bash
npm start
```

and execute:

```bash
npm test
```
`NOTE: If one or more tests fail, please run the script again`


## OpenAPI Documentation Generation

API documentation is automatically generated and accessible at the following path after starting the service:

```url
http://localhost:4000/api
```

After launching the application, an `doc/api.yaml` specification file will also be generated in the doc folder.

The documentation includes descriptions of all endpoints, example requests, and data structures for each resource.

## API Documentation

Each resource is accessible via a dedicated endpoint and supports CRUD operations. Request and response format is `application/json`.

### Users (`/user`)

- `GET /user` - Retrieve all users
- `GET /user/:id` - Retrieve a user by `id`
- `POST /user` - Create a new user
- `PUT /user/:id` - Update a user's password
- `DELETE /user/:id` - Delete a user

### Artists (`/artist`)

- `GET /artist` - Retrieve all artists
- `GET /artist/:id` - Retrieve an artist by `id`
- `POST /artist` - Create a new artist
- `PUT /artist/:id` - Update artist information
- `DELETE /artist/:id` - Delete an artist

### Albums (`/album`)

- `GET /album` - Retrieve all albums
- `GET /album/:id` - Retrieve an album by `id`
- `POST /album` - Create a new album
- `PUT /album/:id` - Update album information
- `DELETE /album/:id` - Delete an album

### Tracks (`/track`)

- `GET /track` - Retrieve all tracks
- `GET /track/:id` - Retrieve a track by `id`
- `POST /track` - Create a new track
- `PUT /track/:id` - Update track information
- `DELETE /track/:id` - Delete a track

### Favorites (`/favs`)

- `GET /favs` - Retrieve all favorite items
- `POST /favs/track/:id` - Add a track to favorites
- `DELETE /favs/track/:id` - Remove a track from favorites
- `POST /favs/album/:id` - Add an album to favorites
- `DELETE /favs/album/:id` - Remove an album from favorites
- `POST /favs/artist/:id` - Add an artist to favorites
- `DELETE /favs/artist/:id` - Remove an artist from favorites

## Validation and Server Responses

Each endpoint returns an appropriate HTTP status code. Example responses include:

- **200** - Successful request
- **201** - Resource created successfully
- **204** - Resource deleted successfully
- **400** - Invalid request data (e.g., invalid UUID format)
- **404** - Resource not found
- **422** - Resource does not exist and cannot be added to favorites

## Notes

- All data is stored in memory, so any data will be lost when the service restarts.
- Deleting an artist, album, or track automatically removes its `id` from favorites and sets `null` in any related records.
