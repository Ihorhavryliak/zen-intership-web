# Message app

 [Message app](https://zen-intership-web.onrender.com/).

## Description

The Message App is a web-based platform that allows users to leave comments on a website. All user comments are saved to a relational database and can be sorted and displayed in a table format.

## Getting Started:
To get started with the Message App, follow these steps:

1. Clone the repository.
2. In the terminal enter command `npm i`

### 

You need create file `.env` with variables:

//url server

`REACT_APP_SITE_SERVER_URL= `

//url socket  listen

`REACT_APP_SITE_LISTEN_SOCKET= `

//key captcha main form

`REACT_APP_SITE_KEY_CAPTCHA = `

//key captcha answer form

`REACT_APP_SITE_KEY_CAPTCHA_ANSWER =  `



Features
The Message App offers the following features:

User Comments: Users can leave comments on the website, which are saved to a relational database.

Comment Sorting: The app provides the ability to sort comments by User Name, E-mail, and date added (in both ascending and descending order).

Pagination: Comments are displayed in groups of 25 per page.

Security: The app includes measures to protect against XSS and SQL injection attacks.

Design: The app includes a simple CSS design.

Technologies Used
The Message App is built using the following technologies:

React: A JavaScript library for building user interfaces.

Node.js: A JavaScript runtime environment for building server-side applications.

Express: A Node.js web application framework for building APIs and web servers.

MySQL: A relational database for storing data.

CSS: A stylesheet language for styling web pages.

Getting Started
To get started with the Message App, follow these steps:

Clone the repository.

Install the required dependencies by running npm install in the project directory.

Set up a MySQL database and create a .env file with your MySQL connection string.

Run the server by running npm run server in the project directory.

Run the client by running npm run client in a separate terminal window in the project directory.

Open the app in your web browser at http://localhost:3000.

Contributing
We welcome contributions from the community! If you would like to contribute to the Message App, please follow these steps:

Fork the repository.

Create a new branch for your changes.

Make your changes and commit them.

Push your changes to your fork.

Create a pull request from your fork to the main repository.