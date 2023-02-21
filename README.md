# Message app

 [Message app](https://zen-intership-web.onrender.com/)
#
## Description

The Message App is a web-based platform that allows users to leave comments on a website. All user comments are saved to a relational database and can be sorted and displayed in a table format.

# Front-end
## Getting Started:
`Recommended using the operating system Windows.`
To get started with the Message App, follow these steps:
1. Clone the repository
2. In the terminal enter the command `npm i`

## Create file `.env` with variables:
1. `REACT_APP_SITE_SERVER_URL= ` ""; //url server. Example `=http://localhost:4000/`
2. `REACT_APP_SITE_LISTEN_SOCKET= ` ""; //url socket  listen. Example `=http://localhost:4000/events`
3. `REACT_APP_SITE_KEY_CAPTCHA = ` ""; //key captcha main form. Example `=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`
4. `REACT_APP_SITE_KEY_CAPTCHA_ANSWER =  ` ""; //key captcha answer form. Example `=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`

## Create a user (require):
1. Register a user on this example page url:  `http://localhost:3000/sign-up`. Do it before as you can send post. (when you connect base Data)

## Run
1. Run  by running `npm start` in the project directory
2. Go to back-end repo:  [back-end repo](https://github.com/Ihorhavryliak/zen-internship-server)
#
# Features
The Message App offers the following features:

User Comments: Users can leave comments on the website, which are saved to a relational database.

User Answer: Users can leave answer on comments on the website, which are saved to a relational database.

Comment Sorting: The app provides the ability to sort comments by User Name, E-mail, and date added (in both ascending and descending order).

Pagination: Comments are displayed in groups of 25 per page.

Security: The app includes measures to protect against XSS and SQL injection attacks.

Design: The app includes a simple CSS design.

# Technologies Used
The Message App is built using the following technologies:

React: A JavaScript library for building user interfaces.

Redux: A JavaScript library for to manage the state 

Node.js: A JavaScript runtime environment for building server-side applications.

Nest.js: A Node.js web application framework for building APIs and web servers.

Postgres: A relational database for storing data.

WebSocket (WS): A WebSocket (WS) for get and send message.

CSS / Bootstrap 5: A stylesheet language for styling web pages.



