# Hacktiv Legend API Documentation

## Models

### User

```md
- email : string, required, unique
- password : string, required
```

### FavoriteMovie

```md
- heroId : integer, required
- userId : integer, required
- role : string, (default: "-")
- power : integer, (default: 0)
```

## Relationship

### One-to-Many

## Endpoints

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /loginGoogle`

Routes below need authentication:

- `GET /movies`
- `GET /movies/genres`
- `GET /movies/nowPlaying`
- `GET /movies/trailer/:id`

- `GET /favorites`
- `POST /favorites/add`

  
Routes below need authentication & authorization:

- `POST /favorites/update/:id`
- `DELETE /delete/:id`

## 1. POST /register

Request:

- body:

```json
{
  "email": "string",
  "username": "string",
  "password": "string"
}
```

Response (201 - Created)

```json
{
    "id": "integer",
    "username": "string",
    "email": "string",
}
```

Response (400 - Bad Request)

```json
{
  "message": "Username is required"
}
{
  "message": "Email is required"
}
OR
{
  "message": "Use the right email format!"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

## 2. POST /login

Request:

- body:

```json
{
  "unameOrEmail": "string",
  "password": "string"
}
```

Response (200 - OK)

```json
{
  "access_token": "string"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Username, email or password can't be empty"
}
```

Response (401 - Unauthorized)

```json
{
  "message": "Invalid Username, email or password"
}
```

## 3. POST /loginGoogle

Request:

- headers:

```json
{
  "google_token": "string",
}
```

Response (200 - OK)

```json
{
  "access_token": "string"
}
```

## 4. GET /movies

Fetch all movies from TMDB

Request:

- query:

```json
{
  "search": "string",
  "page": "integer",
  "year": "string",
  "rating": "string",
  "genreId": "integer"
}
```

Response (200 - OK)

```json
{
    "page": 1,
    "results": [
        {
            "adult": "boolean",
            "backdrop_path": "string",
            "genre_ids": ["integer"],
            "id": "integer",
            "original_language": "string",
            "original_title": "string",
            "overview": "string",
            "popularity": "integer",
            "poster_path": "/string",
            "release_date": "string",
            "title": "string",
            "video": "boolean",
            "vote_average": "string",
            "vote_count": "string"
        },
        ...
    ],
    "total_pages": "integer",
    "total_results": "integer"
}
```

## 5. GET /movies/genres

Fetch all available genre 

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

Response (200 - OK)

```json
{
    "genres": [
        {
            "id": "integer",
            "name": "string"
        },
        ...,
    ]
}
```

## 5. GET /movies/nowPlaying

Get all the films currently showing

Request:

- query:
```json
{
    "page": "integer"
}
```

Response (200 - OK)

```json
{
    "dates": {
            "maximum": "string",
            "minimum": "string"
        },
    "page": 1,
    "results": [
        {
            "adult": "boolean",
            "backdrop_path": "string",
            "genre_ids": ["integer"],
            "id": "integer",
            "original_language": "string",
            "original_title": "string",
            "overview": "string",
            "popularity": "integer",
            "poster_path": "/string",
            "release_date": "string",
            "title": "string",
            "video": "boolean",
            "vote_average": "string",
            "vote_count": "string"
        },
        ...
    ],
    "total_pages": "integer",
    "total_results": "integer"
}
```

## 6. GET /movies/trailer/:id

- Get trailer movie by id film

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

Response (200 - OK)

```json
[
    "string"
]
```

Response (404 - Not Found)

```json
{
  "message": "Movie trailer not found"
}
```



## 6. GET /favorites

- Get favorites movie from user

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

Response (200 - OK)

```json
[
    {
        "id": "integer",
        "title": "string",
        "overview": "string",
        "poster_path": "string",
        "backdrop_path": "string",
        "release_date": "string",
        "vote_average": "string",
        "userId": "integer",
        "createdAt": "string",
        "updatedAt": "string"
    },
    ...,
]
```

Response (404 - Not Found)

```json
{
  "message": "You have no favorite movie"
}
```


## 2. POST /favorites/add

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- body:

```json
{
  "title": "string",
  "overview": "string"
  "poster_path": "string"
  "backdrop_path": "string"
  "release_date": "string"
  "vote_average": "string"
}
```

Response (201 - Created)

```json
{
  "message": "Success add to favorite"
},
OR
{
  "message": "Item Already exist"
}
```

## 2. POST /favorites/update/:id

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- body:

```json
{
  "title": "string",
  "overview": "string"
  "poster_path": "string"
  "backdrop_path": "string"
  "release_date": "string"
  "vote_average": "string"
}
```

Response (200 - OK)

```json
{
        "id": "integer",
        "title": "string",
        "overview": "string",
        "poster_path": "string",
        "backdrop_path": "string",
        "release_date": "string",
        "vote_average": "string",
        "userId": "integer",
        "createdAt": "string",
        "updatedAt": "string"
    }
```

Response (404 - Not Found)

```json
{
  "message": "Movie not found"
}
```

## 2. POST /favorites/delete/:id

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- params:

```json
{
    "id": "integer"
}
```

Response (200 - OK)

```json
{
    "message": "item was successfully deleted"
}
```

Response (404 - Not Found)

```json
{
  "message": "Movie not found"
}
```

## Global Error

Response (401 - Unauthorized)

```json
{
  "message": "Invalid Token"
}
```

Response (403 - Forbidden)

```json
{
  "message": "You don't have access"
}
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal server error"
}
```
