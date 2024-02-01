import styles from './CreatePost.module.sass'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom/dist'
import { useAuthContext } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'


const CreatePost = () => {

    const [title, setTitle] = useState('')
    const [img, setImg] = useState('') 
    const [body, setBody] = useState('') 
    const [tag, setTag] = useState([]) 
    const [formError, setFormError] = useState(null)
    
    

    const {insertDocument, response} = useInsertDocument('posts')
    const {user} = useAuthContext()
    const navigate = useNavigate()

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
        insertDocument({
          title,
          img,
          body,
          tags: tagsArray,
          uid: user.uid,
          createdBy: user.displayName
        })

        // Redirect to home page

        navigate('/')
    }
    return (
      <div className={styles.newPost}>
        <h2>Create Post</h2>
        <p>Write about what you want and share what you know !</p>

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
        {console.log(tag)}
        {!response.loading  && <button className='btn' type='submit'>New Post</button>}
        {response.loading  && <button className='btn' disabled>Wait please ...</button>}
        {response.error && <p className='error'>{response.error}</p>}
        {formError && <p className='error'>{formError}</p>}
        </form>
      </div>
    );
    }

export default CreatePost