import styles from './Search.module.sass'

//hooks

import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'

//components

import PostDetail from '../../components/PostDetail'

import { Link } from 'react-router-dom'


const Search = () => {
    const query = useQuery()
    // Catting params from our url in Home Page=> /search/q=OurQuery
    // Rescue all params was envolved by 'q='
    const search = query.get('q')

    const {documents:posts} = useFetchDocuments('posts', search)

    return (
    <div>
        <div className={styles.post_details}>
            {<h2 className={styles.title}>Results of Search</h2>}
            {posts && posts.length === 0 &&(
                <> 
                    <h2>Posts not found</h2>
                    <Link to='/' className='btn'>Back</Link>
                </>
            )}

            {posts && posts.map((post) => (
            <PostDetail key={post.id} post = {post}></PostDetail>
            ))}

        </div>
    </div>
    )
}

export default Search