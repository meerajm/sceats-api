# sceats-api
Basic CRUD operations api.
## Dependencies required to run
- express
- jsonwebtoken

## routes
To get available records make a get call to ``` /api/v1/restaurants ```

To add a record make a post call to ``` /api/v1/restaurants ```

To get specific record make a get call to ``` /api/v1/restaurants/<id> ```

To update a specific record make a patch call to ``` /api/v1/restaurants/<id> ```

To delete specific record make a delete call to ``` /api/v1/restaurants/<id> ```

> A JWT is required as a header input for authorization of all the above mentioned calls.

> To get a JWT token make a post call to  ``` /login ``` with a valid username and password in request body.

