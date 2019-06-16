# The Movie Database - React App

This project was created for cinephiles and movie hobbyists. It allows them to keep track of upcoming movies and to find out more about each movie.

## To Run This app

1. Clone this repository and go into the app folder
2. Switch to the **development** branch
3. Install the app dependencies

```
git clone https://github.com/petesousa/themoviedatabase-react.git
cd themoviedb-react
git checkout development
npm install
```

After that, create a folder called **/credentials** on the **/src** directory. Inside that folder, create a file called **credentials.js** and store your **The Movie Database** apiKey there. You can request an API key by logging into your account on TMDb and clicking the "API" link.

This file should look like this:

```javascript
const theMovieDatabase = {
  apiKey: "YOUR_TMDB_API_KEY"
}

const credentials = { theMovieDatabase }

export default credentials
```

Finally, start the app

```
npm start
```

## Third-party libraries used in this project

* **axios**: Performs assyncronous requests to the TMDb API.
* **react-router-dom**: Manages app routes.
* **lodash**: Provides helper functions to deal with objects and arrays .
* **react-bottom-scroll-listener**: Listens to when the scroll bar hits the bottom of a given element.
* **prop-types**: Validates the types of props passed to React components.


