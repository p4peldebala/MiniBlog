import styles from './DashBoard.module.sass'
import { Link } from 'react-router-dom'

//hooks

import { useAuthContext } from '../../context/AuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useDeleteDocument } from '../../hooks/useDeleteDocument';


const Dashboard = () => {
  const {user} = useAuthContext()
  const uid = user.uid

  const {documents:posts, loading}= useFetchDocuments('posts', null, uid)

  // Fuction for delete post
  
  const {deleteDocument, response}  = useDeleteDocument('posts')

  // Early Return
  if(loading){
    return <p>Loading data...</p>
  }

  //posts of user
  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <h3>Manage your posts:</h3>

      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <h2>The user has no post</h2>
          <Link className="btn" to={"/posts/create"}>
            Create First Post
          </Link>
        </div>
      ) : (
        <>
        <div className={styles.post_header}>
          <span>Title</span>
          <span>Action</span>
        </div>
          {posts && posts.map((post) => <div key={post.id} className={styles.post_row}>
            <p>{post.title}</p>

            <div className={styles.dashboard_buttons}>
              <Link to={`/posts/${post.id}`} className='btn btn-default'>Check Post</Link>
              <Link to={`/posts/edit/${post.id}`} className='btn  btn-edit'>Edit Post</Link>
              <button onClick={()  =>  deleteDocument(post.id)} className='btn btn-danger' >Delete Post</button>
            </div>
          </div>)}
        
        </>
      )}
    </div>
  );
}

export default Dashboard