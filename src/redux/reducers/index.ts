import {combineReducers} from 'redux'

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

const replies = (state = [], action: any) => {
    switch (action?.type) {
        case "ADD_REPLY":
            return [
                ...state,
                action?.payload
            ]
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
    selectedPost,
    postComments,
    replies
})

export default rootReducer