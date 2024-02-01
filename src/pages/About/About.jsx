// Import CSS
import styles from './About.module.sass'

import { Link } from 'react-router-dom'

export const About = () => {
  return (
    <div className={styles.about}>
      <h2><span> <span className={styles.mini}>Mini</span> Blog</span></h2>
      <p>This project consists of a blog made with <span className={styles.react}>React</span> on the front end and <span className={styles.firebase}>Firebase</span> on the back end</p>

      <Link to='/posts/create' className='btn'>Create Post</Link>
    </div>
  )
}

export default About
