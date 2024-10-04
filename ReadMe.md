Dave Gray youtube tutorial (link below) for Node.js completed 30/09/2024 

OVERVIEW

A comprehensive Node.js project that goes from complete beginner to a final project which comprises: 

1. The reation of a server that displayed different html pages depending on the url 
2. The creation of a database on MongoDB that had a list of users (the people accessing this server) and employees (data only) 
The code includes CRUD operations for users (although user permissions have to be manually entered on MongoDB)
The code includes CRUD operations for employees (depending on the users permissions they only have access to certain CRUD operations for the employee data base)

For a detailed interpretation of the files and folders in this project please refer to the projectInterpretation.txt file. 

PROJECT DEPENDENCIES

There are some very interesting dependencies in this project: 
- nodemon - nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected. https://www.npmjs.com/package/nodemon  
- bcrypt - A library to help you hash passwords. https://www.npmjs.com/package/bcrypt
- cookie-parser - Parse Cookie header and populate req.cookies with an object keyed by the cookie names. https://www.npmjs.com/package/cookie-parser
- cors (Cross-origin resource sharing) CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options. https://www.npmjs.com/package/cors
- dotenv - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. https://www.npmjs.com/package/dotenv
- express - Fast, unopinionated, minimalist web framework for Node.js. https://www.npmjs.com/package/express
- jsonwebtoken - An implementation of JSON Web Tokens. https://www.npmjs.com/package/jsonwebtoken
- mongoose - Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. https://www.npmjs.com/package/mongoose  
- uuid For the creation of RFC9562 (formally RFC4122) UUIDs https://www.npmjs.com/package/uuid

THUNDER CLIENT EXTENSION

Thunder Client was installed as an extension in order to test the requests made to MongoDB. The list of Thunder Client tests for this project are shown at the end of the projectInterpretation.txt file. 

DEFINITIONS / EXPLANTIONS: 

MIDDLEWARE: 
Anything between the request and the response
There are three types of middleware: 
- 'built in' to handle urlencoded data (in other words form data). 
- custom
- thrid party

JWT - JSON WEB TOKENS
A form of user identification that is issued after the initial user authentication
User completes login and they are authenticated the REST API issues an access token and a refresh token
Access token (short time eg 5 to 15 minutes)
Refresh Token (longer duration, eg hours or even days)  
Want to avoid these two issues 
- XSS: Cross-site scripting
- CSRF: CS Request Forgery

ACCESS TOKEN: 
- Sent as JSON 
- Client stores in memory (current application state), automatically lost when the app is closed - (Do NOT store in local storage or cookies)
vs
REFRESH TOKEN: 
- Sent as httpOnly cookie
- Not accessible via Javascript
- Must have expiry at some point (will require users to login in again)

ACCESS TOKEN: 
- Issued at Authorizaton
- Client uses for API Access until expires
- Verified with Middleware
- New Token issued at Refresh request 
vs
REFRESH TOKEN: 
- Issued at authorisation
- Client uses to request new Access Token
- Verified with endpoint database
- Must be allowed to expire or logout (no indefinite access)

SQL DATABASES and NOSQL DATABASES (MONGODB)

The M in the mern stack refers to MongoDB which is a database. Along with Node.js and express MongoDB completes the backend rest API

Tradtional SQL databases are built in a relational structure.
Related tables reference each other with joins as data is queried.
These relational tables also normalise the data (data is not duplicated in the tables which is dry).

Mongo DB stores data in collections, the individual records in the databases are called documents.
Documents have key value structure and look alot like JSON.
A collection holds all of the data about a user for example without breaking it into tables.
Duplicating and distributing the data where deemed neccesary in a no sql structure is permitted.
This is advantageous for the following reasons: 
- Performance - The speed at which a collection is queried is very fast
- Flexability - its very easy to make structural changes like adding a new field without reaking havoc on your structure (like adding a new property to an object)
- Scalability - no sql can support large databases with a high request rates at a very low latency
- Usability - we can get up and running with MongoDB in the cloud very fast

Mongoose Schemas and Data Models allow you to create CRUD operations on MongoDB Data collections 

FINAL NOTE FROM THE PROJECT: 

In the tutorial the project was deployed on glitch.com and the envoironmental variables entered to complete the deployment. Glitch provided a url address which is where API requests from the frontend would be made. 

link: https://www.youtube.com/watch?v=f2EqECiTBL8