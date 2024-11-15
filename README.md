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
- Npm (version 6.x or higher)
- Docker

### Clone the repository

Clone a repository using the following script

```bash
git clone https://github.com/iandyone/nodejs2024Q3-service.git
```

checkout to `home-library-part-2` branch

```bash
git checkout home-library-part-2
```

and install dependence

```bash
npm install 
```

### Environment Variables

Create a `.env` file in the root directory of the project and add the variables by example:

```env
PORT=4000
PORT_DB=5432

POSTGRES_DB=home-library
POSTGRES_USER=postgres
POSTGRES_PASSWORD=root

DATABASE_URL="postgresql://postgres:root@postgres:5432/home-library?schema=public"
```

Warning: if you specify other values, be sure to update the database connection link `DATABASE_URL`

### Start the app

Start Docker if it wasn't already running and launch the application

```bash
docker compose up
```

The script will create a postgres database container based on the `postgres:16-alpine` image and run it. After that, Docker will create the application image, based on `Dockerfile` in the root directory. The application image will be run in a separate container, that will be connected to the database container. By default, the service will listen on port `4000`.

### Database migration

After running the application, you need to apply migrations to the postgres database inside the database container. To do this, open a new terminal tab and run the script:

```bash
npm run db:migrate
```
Now the application is ready to go. Enjoy =)

### Testing

To run tests, the application must be running and connected to the database. If this is done, the tests can be run by executing the script:

```bash
npm test
```

`NOTE: If one or more tests fail, please run the script again`

### Vulnerability scanning 
The application has the ability to scan images for vulnerabilities. To do this, you must be logged in docker service

```bash
docker login
```

Now you can scan the images. To do this, exec the script:
```bash
npm run scan
```
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

- Deleting an artist, album, or track automatically removes its `id` from favorites and sets `null` in any related records.
