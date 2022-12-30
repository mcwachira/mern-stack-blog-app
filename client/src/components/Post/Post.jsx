import React from 'react'
import { Link } from 'react-router-dom'
import './post.css'

const Post = ({ pt }) => {
    console.log(pt)

    const { _id, title, username, createdAt, categories } = pt

    return (
        <div className="post">
            { }
            <img
                className="postImg"
                src='https://images.pexels.com/photos/3062964/pexels-photo-3062964.jpeg?auto=compress&cs=tinysrgb&w=600'
                alt=""
            />
            <div className="postInfo">
                <div className="postCats">

                    {categories.map((category, index) => (<span key={index} className="postCat">
                        <Link className="link" to="/posts?cat=Music">
                            {category}
                        </Link>
                    </span>))}

                </div>
                <span className="postTitle">
                    <Link to={`/post/${_id}`} className="link">
                        {title}
                    </Link>
                </span>
                <hr />
                <span className="postDate">{new Date(createdAt).toDateString()}</span>
            </div>
            <p className="postDesc">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
                officia architecto deserunt deleniti? Labore ipsum aspernatur magnam
                fugiat, reprehenderit praesentium blanditiis quos cupiditate ratione
                atque, exercitationem quibusdam, reiciendis odio laboriosam?
            </p>
        </div>
    )
}

export default Post

