import { useState } from "react"


export const getStaticProps = async() => {
  const res = await fetch('https://api.nasa.gov/planetary/apod?api_key=2aefPj5D3aVYwsR9lvymeVe6bNJeFORgLgR5cJDY')
  const data = await res.json()

  return {
    props : {spacePics : data}
  }
}

const Space = ({ spacePics }) => {

  const [posts, setPosts] = useState([])
  const [like, setLike] = useState('Like')
  const [num, setNum] = useState(1)
  const [show, setShow] = useState(true)

  const fetchPosts = async () => {
    const response = await fetch('/api/spacePosts')
    const data = await response.json()
    setPosts(data)
  }

  const newPosts = async () => {
    const response = await fetch('/api/spacePosts', {
      method : 'POST',
      body: JSON.stringify({spacePics}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log(data)
  }

  const refreshPosts = async () => {
    newPosts()
    fetchPosts()
    setShow(false)
  }

  const likeButton = async () => {
    if (num == 1){
      setLike('Liked')
      setNum(0)
    }
    else{
      setLike('Like')
      setNum(1)
    }
  }
  
  return (
    
    <div>
      <h1>Spacestagram</h1>
        <div>
        {show && (<button onClick = {refreshPosts}>Load Posts</button>)}
        {posts.map((post) => {
          return (
            <div>
              <img src = {post.url}></img>
              <h3>{post.title}</h3>
              <h3>{post.explanation}</h3>
              <h3>{post.date}</h3>
              <button onClick = {likeButton}>{like}</button>
            </div>  
          )
        })
        }
        </div>
    </div>
  );
}

export default Space;
