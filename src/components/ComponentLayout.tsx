import * as React from 'react'
import PostList from "./posts/PostList"
import { Col, Divider, Row } from 'antd'
import CommentList from "./comments/CommentList"
import SearchBar from "./SearchBar"
import * as api from '../api/api'
import {
    PostType, 
    CommentType,
    UserType
} from '../type'

function ComponentLayout() {
    const [comments, setComments] = React.useState([])
    const [postComments, setPostComments] = React.useState([])
    const [currentPostId, setCurrentPostId] = React.useState(-1)
    const [usernameFilter, setUsernameFilter] = React.useState("")
    const [posts, setPosts] = React.useState([])
    const [users, setUsers] = React.useState([])
    const [postsPerUsername, setPostsPerUsername] = React.useState([])

    React.useEffect(() => {
        api.getUsers().then(response => {
            setUsers(response.data)
        })
    }, [])

    React.useEffect(() => {
        api.getComments().then(response => {
            const commentsWithUsername = response.data.map((comment: CommentType) => {
                const username = getUsernameByEmail(comment.email)

                return {
                    ...comment,
                    username
                }
            })
            setComments(commentsWithUsername)
        })

        api.getPosts().then(response => {
            const postsWithUsername = response.data.map((post: PostType) => {
                const username = getUsernameById(post.userId)

                return {
                    ...post,
                    username
                }
            })
            setPosts(postsWithUsername)
        })
    }, [users])

    React.useEffect(() => {
        const commentsPerPost = comments.filter((comment: CommentType) => {
            return comment.postId === currentPostId
        })
        setPostComments(commentsPerPost)
    }, [currentPostId])

    React.useEffect(() => {
        const postsPerUser = posts.filter((post: PostType) => {
            return post.username === usernameFilter
        })
        setPostsPerUsername(postsPerUser)
    }, [usernameFilter, posts])

    const getUsernameById = (id: number) => {
        const correspondingUser: UserType = users.filter((user: UserType) => {
            return user.id === id
        })[0]

        return correspondingUser?.username
    }

    const getUsernameByEmail = (email: string) => {
        const correspondingUser: UserType = users.filter((user: UserType) => {
            return user.email === email
        })[0]

        return correspondingUser?.username
    }

    return (
        <div className="main-layout">
            <Row>
                <Col span={4}>
                    <SearchBar
                        setUsernameFilter={setUsernameFilter}
                    />
                </Col>
            </Row>
            <Divider />
            <Row>
                <Col flex="310px">
                    <PostList
                        posts={usernameFilter !== "" ? postsPerUsername : posts}
                        setCurrentPostId={setCurrentPostId}
                        currentPostId={currentPostId}
                    />
                </Col>
                <Divider type="vertical" />
                <Col flex="auto">
                    <CommentList
                        comments={postComments}
                        currentPostId={currentPostId}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default ComponentLayout