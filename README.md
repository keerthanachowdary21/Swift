# Node.js

This is a simple Node.js web server/application designed as part of a backend assignment. The application uses MongoDB to store user, post, and comment data. The server exposes RESTful endpoints to interact with the data.

## Features

- Load dummy user data from [JSONPlaceholder](https://jsonplaceholder.typicode.com/) into MongoDB.
- Perform CRUD operations on users, posts, and comments.
- Properly typed request and response bodies using TypeScript.
- Three separate MongoDB collections: `users`, `posts`, and `comments`.

## Technologies Used

- **Node.js**: Runtime environment for the server.
- **TypeScript**: For type-safe code.
- **MongoDB**: Database to store user, post, and comment data.
- **REST API**: Exposes endpoints for interacting with the application.

## Setup Instructions

### Prerequisites

1. **Node.js**: Ensure Node.js is installed on your machine. Download it from [here](https://nodejs.org/).
2. **MongoDB**: Install MongoDB locally or use a cloud service like MongoDB Atlas. Follow the [MongoDB installation guide](https://www.mongodb.com/docs/manual/installation/).
3. **TypeScript**: Install TypeScript globally using npm:
   ```bash
   npm install -g typescript
