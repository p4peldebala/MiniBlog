import styles from './PostDetail.module.sass'

import { Link } from 'react-router-dom'

const PostDetail = ({post}) => {
  return (
    <div className={styles.post_details}>
      <img src={post.img} alt={post.title} />
        <div className={styles.full_description}>
            <h2>{post.title}</h2>
            <p className={styles.createdBy}>by {post.createdBy}</p>
        
            <div className={styles.desc}>
                {post.tags.map((tag) => (
                <p key={tag}>
                    <span>#</span>
                    {tag}
                </p>
                ))}
            </div>
        </div>
      <Link to={`/posts/${post.id}`}className='btn'>Read about</Link>
    </div>
  );
}

export default PostDetail