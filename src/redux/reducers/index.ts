import {combineReducers} from 'redux'

const postList = (state = null, action: any) => {
    const payload = action?.payload
    switch (action?.type) {
        case "POSTS_LIST":
            return payload
        case "VIDEOS_LIST_ERROR_MESSAGE":
            return payload
        default:
            return state
    }
}

const commentList = (state = null, action: any) => {
    const payload = action?.payload
    switch (action?.type) {
        case "COMMENT_LIST":
            return payload
        case "VIDEOS_LIST_ERROR_MESSAGE":
            return payload
        default:
            return state
    }
}


const postSelected = (state = null, action: any) => {
    const payload = action?.payload
    switch (action?.type) {
        case "POST_LIST":
            return payload[1]
        case "POST_SELECTED":
            return action.post
        default:
            return state
    }
}

const rootReducer = combineReducers({
    postList,
    commentList,
    postSelected
})

export default rootReducer