import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import BottomScrollListener from 'react-bottom-scroll-listener';
import theMovieDatabase from '../../themoviedb/themoviedb' 

import Loading from '../Loading/Loading'
import SearchBar from '../SearchBar/SearchBar'
import MovieCard from '../MovieCard/MovieCard'


import styles from './UpcomingMovies.module.css'

export default function UpcomingMovies(){
  
  const [upcomingMovies, setUpcomingMovies] = useState([])

  useEffect(() => { 
    theMovieDatabase.loadMovies().then(setUpcomingMovies) 
    return function cleanup() {
      return []
    }
  }, [])
  async function loadMovies() {
    return theMovieDatabase.loadMovies().then(setUpcomingMovies)
  }

  if (!upcomingMovies.length > 0) return <Loading theme={'Light'} />

  return (
    <>
      { upcomingMovies && <SearchBar upcomingMovies={upcomingMovies} />}
      <h3 className={styles.introduction}>... or browse through the upcoming ones</h3>
      <section className={styles.upcomingMoviesSection}>
        { 
          upcomingMovies && upcomingMovies.map(movie => {
            return <Link key={movie.id} to={`/movie/${movie.id}`}><MovieCard key={movie.id} movie={movie} /></Link> 
          })
        }
        <BottomScrollListener onBottom={loadMovies} />
      </section>
    </>
  )
}
