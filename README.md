# Event-API

## Setup

This project uses a database created with the 'CreateTestDatabase.sql' file. 

1. Make sure you have created the database from the source file and that it is running.
2. Clone this repository
3. Run 'npm install' when inside the cloned repository
4. Create .env file for setting up environment variables. The file will be used by the [dotenv-module](https://www.npmjs.com/package/dotenv). The file needs to contain the following keys-value pairs: 
    * HOST (MySQL host address. Most likely 'localhost')
    * USER (MySQL username)
    * PASSWORD (MySQL password)
    * DATABASE (MySQL database name, in this case 'example_db')
5. Run the project with 'npm start'
6. Navigate to http://localhost:3001 to view the client