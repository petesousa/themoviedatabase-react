import React, { useState } from 'react'
import Proptypes from 'prop-types'

import theMovieDatabase from '../../themoviedb/themoviedb'

import AutoComplete from './AutoComplete'

import styles from './SearchBar.module.css'

export default function SearchBar({ upcomingMovies }) {
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ suggestions, setSuggestions ] = useState([])

  async function updateSearchTerm(e) {
    const term = e.target.value
    setSearchTerm(term)
    const inputValue = term.trim().toLowerCase()
    const inputLength = inputValue.length
  
    if (inputLength === 0) return setSuggestions([])

    const suggestionList = await theMovieDatabase.searchMovies(inputValue)
      .then(movies => {
        const list = []
        // .filter() would be much more straightforward but there are some duplicates
        // must find a better way of doing this
        movies.map(movie => {
          if (movie.title.toLowerCase().slice(0, inputLength) === inputValue) { 
            if(!list[movie.id]) list[movie.id] = movie
          }
          return null
        })
        return list
    })
    
    setSuggestions(suggestionList)
    return suggestionList
  }

  return (
    <div className={styles.navBar}>
      <input 
        autoComplete='on'
        value={searchTerm}
        onChange={updateSearchTerm}
        type='text' 
        className={styles.searchInput} 
        placeholder='Search for your favorite movie...'
      />
      { suggestions && suggestions.length > 0 && <AutoComplete suggestions={suggestions} /> }
    </div>
  )
}

SearchBar.propTypes = {
  upcomingMovies: Proptypes.array.isRequired
}

