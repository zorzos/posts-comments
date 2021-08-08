import { 
    CommentType,
    PostType,
    UserType,
    CommentToAddType
} from "../../type"

const setUserList = (users: UserType[]) => {
    return {
        type: "USERS_LIST",
        payload: users
    }
}

const setPostList = (posts: PostType[]) => {
    return {
        type: "POSTS_LIST",
        payload: posts
    }
}

const setCommentList = (comments: CommentType[]) => {
    return {
        type: 'COMMENTS_LIST',
        payload: comments
    }
}

const addComment = (comment: CommentToAddType) => {
    return {
        type: "ADD_COMMENT",
        payload: comment
    }
}
  
const setSelectedPost = (post: PostType) => {
    return {
        type: "SELECTED_POST",
        payload: post
    }
}

const postComments = (posts: PostType[]) => {
    return {
        type: "POST_COMMENTS",
        payload: posts
    }
}

export {
    setUserList,
    setPostList,
    setCommentList,
    addComment,
    setSelectedPost,
    postComments
}