import Post from './Post'
import { 
    PostType
} from '../../type'

function PostList(props: {
    setCurrentPostId: (id: number) => void,
    posts: PostType[],
    currentPostId: number
}) {
    const {
        setCurrentPostId,
        posts,
        currentPostId
    } = props

    return (
        <div className="post-list">
            {posts.map((post: PostType) => {
                const border = currentPostId === post.id ? "active-post" : undefined
                return (
                    <div
                        className="post-container"
                        key={post.id}
                        onClick={() => setCurrentPostId(post.id)}
                    >
                        <Post 
                            className={`${border}`}
                            title={post.title}
                            body={post.body}
                            username={post.username}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default PostList