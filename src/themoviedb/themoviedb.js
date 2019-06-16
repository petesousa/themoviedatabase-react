import axios from 'axios'
import _ from 'lodash'

import credentials from '../credentials/credentials'

const theMovieDatabaseConfig = {
  baseUrl: 'https://api.themoviedb.org/3',
  imagesPathUrl: 'https://image.tmdb.org/t/p',
  movieCardImageSize: 'w300',
  moviePosterImageSize: 'w500',
  movieBackdropImageSize: 'w500',
  movieGenreListUrl: '/genre/movie/list',
  upcomingMoviesUrl: '/movie/upcoming',
  movieDetailsUrl: '/movie/',
  searchMovieUrl: '/search/movie',
  pageUrl: '&page=',
  queryUrl: '&query=',
  apiKey: `?api_key=${credentials.theMovieDatabase.apiKey}`
}

class TheMovieDatabase {
  constructor() {
    this.tmdbConf = theMovieDatabaseConfig
    this.loading = false
    this.movieGenres = []
    this.displayMovie = {}
    this.upcomingMovies = { movieList: [], currentPage: 0 }
    this.suggestions = []
  }
  
  isLoading = () => this.loading
  startLoading = () => this.loading = true
  finishedLoading = () => this.loading = false
  setMovieGenres = movieGenres => this.movieGenres = movieGenres
  updateMovies = movies => movies.map(movie => this.upcomingMovies.movieList = [ ...this.upcomingMovies.movieList, movie ])
  updateSuggestions = suggestions => suggestions.map(suggestion => this.suggestions = [ ...this.suggestions, suggestion ])
  formatDate = date => new Date(date).toLocaleDateString()

  async fetchMovieGenres() {
    if(this.upcomingMovies.currentPage !== 0) { return }

    const { baseUrl, movieGenreListUrl, apiKey } = this.tmdbConf
    const url = `${baseUrl}${movieGenreListUrl}${apiKey}`

    const genreList = await axios.get(url)
      .then(payload => payload.data.genres.map(g => g))
      .then(genres => this.setMovieGenres(genres))
      .catch(err => [])
    
    return genreList
  }

  async loadMovies() {
    if(this.upcomingMovies.currentPage === 0) this.fetchMovieGenres()

    const { baseUrl, upcomingMoviesUrl, imagesPathUrl, movieCardImageSize, apiKey, pageUrl } = this.tmdbConf
    const url = `${baseUrl}${upcomingMoviesUrl}${apiKey}${pageUrl}${++this.upcomingMovies.currentPage}`
    
    const movieList = await axios.get(url)
      .then(payload => {
        return payload.data.results.map(movie => {
          const { id, title, poster_path, genre_ids, overview, release_date } =  movie
  
          const movieGenres = genre_ids.map(genreId => {
            const index = _.findKey(this.movieGenres, ['id', genreId])
            return this.movieGenres[index].name
          })
  
          const releaseDate = this.formatDate(release_date)

          const imageUrl = `${imagesPathUrl}/${movieCardImageSize}/${poster_path}`
          const posterImage = poster_path ? imageUrl : ''
  
          return { 
            id,
            title,
            posterImage,
            movieGenres,
            overview,
            releaseDate
          }
        })
      })
      .catch(err => [])
      
    movieList && this.updateMovies(movieList)
    return this.upcomingMovies.movieList    
  }
   
  async loadMovieData(movieId) {
    this.fetchMovieGenres()
    
    const { baseUrl, movieDetailsUrl, imagesPathUrl, movieBackdropImageSize, apiKey } = this.tmdbConf
    const url = `${baseUrl}${movieDetailsUrl}${movieId}${apiKey}`
    
    const movieDetails = await axios.get(url)
      .then(payload => {
        const { 
          id,
          title,
          original_title,
          overview,
          genres,
          backdrop_path,
          release_date } = payload.data

        const movieGenres = genres.map(genre => {
          const index = _.findKey(this.movieGenres, ['id', genre.id])
          return this.movieGenres[index].name
        })
        const releaseDate = this.formatDate(release_date)
        const imageUrl = `${imagesPathUrl}/${movieBackdropImageSize}`
        const backdropImage = backdrop_path ? `${imageUrl}/${backdrop_path}` : ''

        return {
          id,
          title,
          originaTitle: original_title,
          overview,
          movieGenres,
          backdropImage,
          releaseDate }
      })
      .catch(err => [])
    
      return movieDetails
  }

  async searchMovies(searchTerm) {
    const { baseUrl, searchMovieUrl, apiKey, queryUrl, pageUrl } = this.tmdbConf
    const url = `${baseUrl}${searchMovieUrl}${apiKey}${queryUrl}${searchTerm}${pageUrl}1`
    
    const suggestions = await axios.get(url)
      .then(payload => payload.data.results)
      .catch(err => [])
      
    suggestions && this.updateSuggestions(suggestions)
    return this.suggestions    
  }

}

export default new TheMovieDatabase()
