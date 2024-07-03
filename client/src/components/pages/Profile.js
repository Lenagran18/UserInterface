import { fetchData } from "../../main.js";
import { useState, useContext } from "react";
import UserContext from "../../Context/userContext.js";

const Profile = () => {
    const { user } = useContext(UserContext);
    const authorId = user.authorId; //id:667354a0ab1d5605b0cd38ce l 123

    const [post, setPost] = useState({
        authorId: authorId,
        postContent: ''
    });
    const [posts, setPosts] = useState([]);
    const { postContent } = post
    const onChange = (e) => setPost({ ...post, [e.target.name]: e.target.value })

    const onSubmit = (e) => {

        e.preventDefault();
        console.log('authorId:', post.authorId)
        fetchData('/post/createPost',
            {
                postContent,
                authorId: authorId
            },
            "POST")

            .then((data) => {
                console.log(data);
                if (!data.message) {

                    setPosts([postContent, ...posts]); //Add new post
                    setPost({ postContent: '' }); //Clear text area
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="writePost">
            <div className="mb-3">
                <form onSubmit={onSubmit}>
                    <h1> {user.username}'s Profile</h1>

                    <label htmlFor="floatingTextarea"> Create Post</label>
                    <textarea
                        className="form-control"
                        placeholder="What's new..."
                        id="postContent"
                        name="postContent"
                        onChange={onChange}
                        value={postContent}
                        required
                    />
                    <button type="submit" className="btn">Post</button>
                </form>
            </div>

            <div className="posts">
                {posts.length !== 0 ? (
                    <ul>
                        {posts.map((content, index) => (
                            <li key={index} className="posts">
                                {content}
                            </li>
                        ))}
                    </ul>
                ) : (<p>No posts yet</p>)
                }
            </div>
        </div>
    );
}

export default Profile;