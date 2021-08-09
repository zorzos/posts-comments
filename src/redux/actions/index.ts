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
  
const setSelectedPost = (post: PostType) => {
    return {
        type: "SELECTED_POST",
        payload: post
    }
}

const postComments = (comments: CommentType[]) => {
    return {
        type: "POST_COMMENTS",
        payload: comments
    }
}

const addReply = (comment: CommentToAddType) => {
    return {
        type: "ADD_REPLY",
        payload: comment
    }
}

export {
    setUserList,
    setPostList,
    setSelectedPost,
    postComments,
    addReply
}