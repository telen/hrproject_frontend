import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.less'
import { classnames, config } from 'utils'

const Welcome = () => {
  return (
    <div className={classnames('content-inner', styles.welcome)}>
      <div>
        <h1>欢迎进入</h1>
        <h3>{config.name + config.namesub}</h3>
      </div>
      <div className={styles.wlimg}>
        <img src="/wbg_03.png" />
      </div>
    </div>
  )
}

export default Welcome
