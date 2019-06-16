import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import UpcomingMovies from '../UpcomingMovies/UpcomingMovies'
import MoviePage from '../MoviePage/MoviePage'

import styles from './App.module.css'

export default function App(props){
  return (
    <div className={styles.app}>
      <Router>
        <div className={styles.main}>
          <Switch>
            <Route exact path="/" component={() => <UpcomingMovies />} />
            <Route path="/movie/:movieId" component={(props) => <MoviePage props={props}/>} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}
