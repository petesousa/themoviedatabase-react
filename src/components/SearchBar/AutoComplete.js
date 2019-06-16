import React from 'react'
import Proptypes from 'prop-types'

import { Link } from 'react-router-dom'

import styles from './SearchBar.module.css'

export default function AutoComplete({ suggestions }) {
  return (
    <ul className={styles.suggestionContainer}>
      { 
        suggestions.map(s => {
          return (
            <Link 
              to={`/movie/${s.id}`}
              key={s.id}
              className={styles.suggestionLink}
              >
              <li className={styles.sugestionLine}>{s.title}</li>
            </Link>
          )
        })
      }
    </ul>
  )
}

AutoComplete.propTypes = {
  suggestions: Proptypes.array.isRequired
}
