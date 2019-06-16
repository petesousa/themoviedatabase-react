import React from 'react'
import Proptypes from 'prop-types'

import styles from './Loading.module.css'

export default function Loading({ theme }){
  return <div className={styles[`loading${theme}`]}><i className="fas fa-spinner fa-spin"></i></div>
}

Loading.propTypes = {
  theme: Proptypes.string.isRequired
}