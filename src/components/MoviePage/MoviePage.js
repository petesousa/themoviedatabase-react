import React, { useState, useEffect } from 'react'
import Proptypes from 'prop-types'
import { Link } from 'react-router-dom'

import theMovieDatabase from '../../themoviedb/themoviedb' 

import Loading from '../Loading/Loading'

import styles from './MoviePage.module.css'

export default function MoviePage(props){
  
  const {movieId} = props.props.match.params
  const [movieData, setMovieData] = useState({})
  
  useEffect(() => { 
    theMovieDatabase.loadMovieData(movieId).then(setMovieData) 
    return function cleanup() {
      return []
    }
  }, [movieId])
  useEffect(() => { return () => [] }, [] )

  if (!movieData.id) return <Loading theme={'Dark'} />

  const { title, originaTitle, overview, movieGenres, backdropImage, releaseDate } = movieData
  const fullTitle = title !== originaTitle ? `${title} - ${originaTitle}` : title
  
  return (
    <section className={styles.moviePage}>
        <div className={styles.movieBox}>
          <Link className={styles.goBack} to={'/'}><i className="fas fa-times"></i></Link>

          { backdropImage !== '' && <img className={styles.backdropImage} src={backdropImage} alt=''/> }
          
          <div className={styles.detailBox}>
            <h1 className={styles.title}>{String(fullTitle).toUpperCase()}</h1>
            <h5 className={styles.movieStats}>Released {releaseDate}</h5>
            <p className={styles.overview}>{overview}</p>
            <h4 className={styles.movieGenres}>Genres: {movieGenres.join(", ")}</h4>
          </div>
        </div>
    </section>
  )
}

MoviePage.propTypes = {
  props: Proptypes.object.isRequired
};
