import * as React from 'react'
import { useSelector, useDispatch, DefaultRootState } from 'react-redux'
import PostList from "./components/posts/PostList"
import { Col, Divider, Row } from 'antd'
import CommentList from "./components/comments/CommentList"
import SearchBar from "./components/SearchBar"
import * as api from './api/api'
import 'antd/dist/antd.css'
import './App.css'
import {
    PostType, 
    CommentType,
    UserType,
    CommentToAddType
} from './type'

import * as actions from "./redux/actions"
interface DefaultState extends DefaultRootState {
  postList: PostType[],
  commentList: CommentType[],
  postComments: CommentType[],
  userList: UserType[]
}

function App() {
    const dispatch = useDispatch()
    const postList = useSelector((state: DefaultState) => state.postList)
    const commentList = useSelector((state: DefaultState) => state.commentList)
    const postComments = useSelector((state: DefaultState) => state.postComments)
    const userList = useSelector((state: DefaultState) => state.userList)

    const [currentPostId, setCurrentPostId] = React.useState(-1)
    const [usernameFilter, setUsernameFilter] = React.useState("")
    const [postsPerUsername, setPostsPerUsername] = React.useState([])
    const [nextDummyId, setNextDummyId] = React.useState(501)

    React.useEffect(() => {
        api.getUsers().then(response => {
            dispatch(actions.setUserList(response.data))
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
            dispatch(actions.setCommentList(commentsWithUsername))
        })

        api.getPosts().then(response => {
            const postsWithUsername = response.data.map((post: PostType) => {
                const username = getUsernameById(post.userId)

                return {
                    ...post,
                    username
                }
            })
            dispatch(actions.setPostList(postsWithUsername))
        })
    }, [userList])

    React.useEffect(() => {
      dispatch(actions.postComments(getCommentsPerPost(currentPostId) as never[]))
    }, [commentList])

    const getCommentsPerPost = (currentPostId: number) => {
      return commentList.filter((comment: CommentType) => {
        return comment.postId === currentPostId
      })
    }

    React.useEffect(() => {
        if (currentPostId !== -1) {
          const currentPost = postList.filter((post: PostType) => {
            return post.id === currentPostId
          })[0]

          dispatch(actions.setSelectedPost(currentPost))
          dispatch(actions.postComments(getCommentsPerPost(currentPostId) as never[]))
        }
    }, [currentPostId])

    React.useEffect(() => {
        if (usernameFilter !== "") {
          const postsPerUser = postList.filter((post: PostType) => {
              return post.username.toLowerCase() === usernameFilter.toLowerCase()
          })

          setPostsPerUsername(postsPerUser as never)
        }
    }, [usernameFilter])

    const getUsernameById = (id: number) => {
        const correspondingUser: UserType = userList.filter((user: UserType) => {
            return user.id === id
        })[0]

        return correspondingUser?.username
    }

    const getUsernameByEmail = (email: string) => {
        const correspondingUser: UserType = userList.filter((user: UserType) => {
            return user.email === email
        })[0]

        return correspondingUser?.username
    }
    
    const addComment = (comment: CommentToAddType) => {
      api.postComment(comment).then(response => {
        const addedComment = response.data
        if (addedComment.id === 501) {
          const nextId = nextDummyId + 1
          addedComment.id = nextId
          setNextDummyId(nextId)
        }
        dispatch(actions.addComment(response.data))
        if (response.data.replyingTo) {
          dispatch(actions.postComments(getCommentsPerPost(currentPostId) as never[]))
        }
      })
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
                        posts={usernameFilter !== "" ? postsPerUsername : postList}
                        setCurrentPostId={setCurrentPostId}
                        currentPostId={currentPostId}
                    />
                </Col>
                <Divider type="vertical" />
                <Col flex="auto">
                    <CommentList
                        comments={postComments}
                        currentPostId={currentPostId}
                        addComment={addComment}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default App