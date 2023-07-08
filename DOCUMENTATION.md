# API Documentation
This API provides endpoints for creating, retrieving, updating, and deleting to-do items. It allows you to manage your to-do list efficiently by performing CRUD operations on it.

## Base URL
```
https://localhost:3000/api/
```

## Endpoints
The API supports the following endpoints:

---
### Note
__Requests must be made with JSON type__
```
Content-Type: application/json
```
---

__Retrive all todos__
```HTTP
GET /api/todos
```
- **Response**: JSON array containing all the to-do items.
  - Example response:
    ```JSON
    [
      {
        "id": 1,
        "title": "Buy vegetables",
        "Content": "Don't miss to buy vegetables",
        "completed": false
      },
      {
        "id": 2,
        "title": "Walk the dog",
        "content": "Don't miss to walk the dog",
        "completed": true
      }
    ]
    ```

__Create todo__
```HTTP
POST /api/todos
```
- **Request body**: JSON object containing the to-do item data.
   - Example request:
     ```JSON
      {
        "title": "Buy vegetables",
        "Content": "Don't miss to buy vegetables",
        "completed": false
      }   
     ```
- **Response**: JSON object representing the created to-do item.
  - Example response:
    ```JSON
      {
        "id": 1,
        "title": "Buy vegetables",
        "Content": "Don't miss to buy vegetables",
        "completed": false
      }   
     ```

__Retive specefic todo__
```HTTP
GET /api/todos/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | The unique identifier of the to-do item |
- **Response**: JSON object representing the requested to-do item.
  - Example request:
    ```HTTP
    GET /api/todos/1
    ```
  - Example response:
    ```JSON
      {
        "id": 1,
        "title": "Buy vegetables",
        "Content": "Don't miss to buy vegetables",
        "completed": false
      }   
     ```
    
__Update todo__
```HTTP
PATCH /api/todos/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | The unique identifier of the to-do item |
- **Request body**: JSON object containing the updated to-do item data.
  - Example request:
    ```HTTP
    PATCH /api/todos/1
    ```
    ```JSON
      {
        "title": "Buy vegetables",
        "Content": "Don't miss to buy vegetables",
        "completed": false
      }   
     ```
- **Response**: JSON object representing the updated to-do item.
  - Example response:
    ```JSON
      {
        "id": 1,
        "title": "Buy vegetables",
        "Content": "Don't miss to buy vegetables",
        "completed": true
      }   
     ```
  
__Delete todo__
```HTTP
DELETE /api/todos/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | The unique identifier of the to-do item |
- **Response**: JSON object indicating the success or failure of the deletion operation.
  - Example request:
    ```HTTP
    DELETE /api/todos/1
    ```
  - Example response:
    ```JSON
    {
      "success": true
    }
    ```
## Errors
This API uses the following error codes:
- `400 Bad Request` &rarr; The request was malformed or missing required parameters.
- `404 Not Found` &rarr; The requested resource was not found.
- `500 Internal Server Error` &rarr; An unexpected error occurred on the server.
