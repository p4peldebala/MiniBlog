// Import CSS
import styles from './Home.module.sass'

// hooks
import { useNavigate, Link, Navigate } from 'react-router-dom'

// react

import { useState } from 'react'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import PostDetail from '../../components/PostDetail'
import { useQuery } from '../../hooks/useQuery'

// components

const Home = () => {
  const [query, setQuery] = useState('')
  const {documents:posts, loading, error} = useFetchDocuments("posts")
  const navigate = useNavigate()

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(query){
      return navigate(`/search?q=${query}`)
    }
  }


  return (
    <div>
      <h1>View the most recent posts</h1>

      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="Type what you want to search by tag ..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <button className="btn btn-dark" >Search</button>
      </form>
      {console.log(posts)}
      
      <div className={styles.home}>

        {loading && <p>Loading...</p> }
        {posts && posts.map((post) => (
          <PostDetail key={post.id} post = {post}></PostDetail>
        ))}


        {/* If don't have no any post*/}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <h2>Posts not found</h2>
            <Link className="btn" to={"/posts/create"}>
              Create First Post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home