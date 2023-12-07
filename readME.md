SETUP

- open the terminal and navigate until the root folder of the project
- run "npm install"
- after the installation is completed, run "npm start"
- now you can test the application

The application use an in-memory system that simulates a mongoDB database.
Any time you restart the application all the data will be completely deleted.

The documentation provided wasn't clear about how to structure the user's favorites vehicles.
I put in this way: a single user can make CRUD operation on your vehicle, but this makes the possibility to create
the same model for 2 different users.
To avoid this in a real-case scenario we could create a collection that handle a many-to-many relationship between
users and vehicles, or even add a property in the vehicle's collection to save an array of users ID
and handle the edits for the vehicle internally to avoid repetions.

The Endpoint POST /user/login returns also the access token
Copy it and paste it into the proper field on the software to call the API
(e.g. in Postman Authorization -> Type Bearer token -> Token)

### Endpoints

#### User

---

<details>
 <summary><code>GET</code> <code><b>/user/all</b></code> <code>(Return all the users)</code></summary>

##### Authorization

```
Authorization: No auth
```

##### Response

```
All the users created
```

</details>

<details>
 <summary><code>POST</code> <code><b>/user/sign-up</b></code> <code>(User registration)</code></summary>

##### Authorization

```
Authorization: No auth
```

##### Body

```
- username: user123 (string, required)
- password: tEst_123 (string, required)
```

##### Response

```
User created
```

</details>

<details>
 <summary><code>POST</code> <code><b>/user/login</b></code> <code>(User login)</code></summary>

##### Authorization

```
Authorization: No auth
```

##### Body

```
- username: user123 (string, required)
- password: tEst_123 (string, required)
```

##### Response

```
User logged in, access token
```

</details>

#### Vehicle

---

<details>
 <summary><code>GET</code> <code><b>/vehicle/favorites</b></code> <code>(Get all the favorite vehicles of the logged user)</code></summary>

##### Authorization

```
Authorization: Access token
```

##### Response

```
Favorite vehicles of the logged user
```

</details>

<details>
 <summary><code>POST</code> <code><b>/vehicle/add</b></code> <code>(Create a favorite vehicle associated to the logged user)</code></summary>

##### Authorization

```
Authorization: Access token
```

##### Body

```
- make: Ford (string, required)
- model: Mustang GT (string, required)
- year: 1992 (number, required)
```

##### Response

```
Created vehicle
```

</details>

<details>
 <summary><code>PUT</code> <code><b>/vehicle/update/{vehicle_id}</b></code> <code>(Update a favorite vehicle associated to the logged user)</code></summary>

##### Authorization

```
Authorization: Access token
```

##### Parameters

```
- vehicle_id (string, required)
```

##### Body

```
- make: Ford (string)
- model: Mustang GT (string)
- year: 1992 (number)
```

##### Response

```
Updated vehicle
```

</details>

<details>
 <summary><code>DELETE</code> <code><b>/vehicle/delete/{vehicle_id}</b></code> <code>(Delete a favorite vehicle associated to the logged user)</code></summary>

##### Authorization

```
Authorization: Access token
```

##### Parameters

```
- vehicle_id (string, required)
```

##### Response

```
Deleted vehicle
```

</details>
