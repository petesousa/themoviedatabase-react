import React from 'react'
import Proptypes from 'prop-types'

import styles from './MovieCard.module.css'

export default function MovieCard({ movie }) {
  const { id, movieGenres, posterImage, releaseDate, title } = movie
  return (
    <article key={id}>
      <div className={styles.cardInfo}>
        <h3 className={styles.movieTitle}>{title}</h3>
        <h4 className={styles.movieGenres}>{movieGenres.join(", ")}</h4>
        <h5 className={styles.releaseDate}>{releaseDate}</h5>
      </div>
      <img className={styles.posterImage} src={posterImage} alt=''/>
    </article>
  )
}

MovieCard.propTypes = {
  movie: Proptypes.object.isRequired
}

