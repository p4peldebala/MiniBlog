import styles from './EditPost.module.sass'
import { useState, useEffect} from 'react'
import { useNavigate, useParams} from 'react-router-dom/dist'
import { useAuthContext } from '../../context/AuthContext'
import { useFetchDocument } from '../../hooks/useFetchIndivualDocument'
import { useUpdatedeDocument } from '../../hooks/useUptadeDocument'


const EditPost = () => {
    const {id} = useParams()
    const {document:post, loading}= useFetchDocument('posts',id)
    

    const [title, setTitle] = useState('')
    const [img, setImg] = useState('') 
    const [body, setBody] = useState('') 
    const [tag, setTag] = useState([]) 
    const [formError, setFormError] = useState(null)

    const {updatedDocument, response} = useUpdatedeDocument('posts', id)
    const {user} = useAuthContext()
    const navigate = useNavigate()

    useEffect(()=>{
        if(post){
          setTitle(post.title)
          setBody(post.body)
          setImg(post.img)
  
          // Transform in String
  
          const textTags = post.tags.join(', ')
  
          setTag(textTags)
        }
      },[post])

    const handleSubmit = (e) =>{
        e.preventDefault()
        setFormError('')

        // validate img URL
        try {
          new URL(img)
        } catch (error) {
          setFormError('The picture needs to be an URL')
        }

        // Create TAGs array 
        const tagsArray = tag.split(',').map((tag) => tag.trim().toLowerCase())
        // Check all values

        if(!title || !img || !body || tag){
          setFormError('Please, fill in all the fields on the form')
        }

        if (formError) return;
        const data ={
          title,
          img,
          body,
          tags: tagsArray,
          uid: user.uid,
          createdBy: user.displayName
        }
        updatedDocument(id, data)

        // Redirect to home page

        navigate('/dashboard')
    }
    return (
        <div className={styles.newPost}>
            {post && (
                <>
                    <h2>Editing the post: {post.title}</h2>
                    <h3>Change as you prefer</h3>
        
                    <form onSubmit={handleSubmit}>
                    <label>
                        <span>Title</span>
                        <input
                        type="text"
                        name="title"
                        required
                        placeholder="Think in good title ..."
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        />
                    </label>

                    <label>
                        <span>Image URL</span>
                        <input
                        type="text"
                        name="image"
                        required
                        placeholder="Insert an image that represents your post"
                        onChange={(e) => setImg(e.target.value)}
                        value={img}
                        />
                    </label>
                    <h2>Preview current image:
                    </h2>
                    <img src={post.img} alt={post.title}/>
                    <label>
                        <span>Body</span>
                        <textarea
                        name="body"
                        required
                        placeholder="Insert the content of your post"
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                        ></textarea>
                    </label>

                    <label>
                        <span>Tags:</span>
                        <input
                        type="text"
                        name="image"
                        required
                        placeholder="Insert the tags apart by commas. Ex: dance, music ..."
                        onChange={(e) => setTag(e.target.value)}
                        value={tag}
                        />
                    </label>
                    
                    {!response.loading  && <button className='btn' type='submit'>Edit Post</button>}
                    {response.loading  && <button className='btn' disabled>Wait please ...</button>}
                    {response.error && <p className='error'>{response.error}</p>}
                    {formError && <p className='error'>{formError}</p>}
                    </form>
                </>
            )}
        </div>
    );
    }

export default EditPost