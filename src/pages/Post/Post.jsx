import styles from './Post.module.sass'

//hooks
import { useFetchDocument } from '../../hooks/useFetchIndivualDocument'

import { useParams } from 'react-router-dom'

const Post = () => {
    const {id} = useParams()

    const {document:post, loading}= useFetchDocument('posts',id)
    console.log(post);
    return (
      <div className={styles.post_container}>
        {post && (
          <>
            {loading && <p>Loading post...</p>}
            <h1>{post.title}</h1>
            <img src={post.img} alt={post.title}/>
            <p className={styles.post_body}>{post.body}</p>
            <h3>This post is about: </h3>
            
            <div className={styles.tags}>
                {post.tags.map((tag) => (
                <p key={tag}>
                    <span>#</span> {tag}
                </p>
                ))}
            </div>
          </>
        )}
      </div>
    );
}

export default Post