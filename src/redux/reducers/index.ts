import {combineReducers} from 'redux'
import { sortCommentTree } from './util'

const userList = (state = [], action: any) => {
    const payload = action?.payload
    switch (action?.type) {
        case "USERS_LIST":
            return payload
        default:
            return state
    }
}

const postList = (state = [], action: any) => {
    const payload = action?.payload
    switch (action?.type) {
        case "POSTS_LIST":
            return payload
        default:
            return state
    }
}

const commentList = (state = [], action: any) => {
    const payload = action?.payload
    switch (action?.type) {
        case "COMMENTS_LIST":
            return payload
        case "ADD_COMMENT":
            if (payload.replyingTo) {
                return sortCommentTree(state, payload)
            } else {
                return [
                    ...state,
                    payload
                ]
            }
        default:
            return state
    }
}


const selectedPost = (state = {}, action: any) => {
    switch (action?.type) {
        case "SELECTED_POST":
            return action.payload
        default:
            return state
    }
}

const postComments = (state = [], action: any) => {
    switch (action?.type) {
        case "POST_COMMENTS":
            return [
                ...action?.payload
            ]
        default:
            return state
    }
}

const rootReducer = combineReducers({
    userList,
    postList,
    commentList,
    selectedPost,
    postComments
})

export default rootReducer