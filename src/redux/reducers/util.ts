import { CommentType } from "../../type";

export const sortCommentTree = (comments: CommentType[], comment: CommentType) => {
    comments.forEach(existingComment => {
        if (comment.replyingTo === existingComment.id) {
            if (existingComment.replies) {
                existingComment.replies.push(comment)
            } else {
                const newReplies = []
                newReplies.push(comment)
                existingComment.replies = newReplies
            }
        } else {
            if (existingComment.replies) {
                sortCommentTree
            (existingComment.replies, comment)
            }
        }
    })

    return comments
}