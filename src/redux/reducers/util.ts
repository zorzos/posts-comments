import { CommentType } from "../../type";

export const sortReplies = (comments: CommentType[], reply: CommentType) => {
    comments.forEach(comment => {
        if (reply.replyingTo) {
            if (reply.replyingTo === comment.id) {
                if (comment.replies) {
                    comment.replies.push(reply)
                } else {
                    const newReplies = []
                    newReplies.push(reply)
                    comment.replies = newReplies
                }
            } else if (comment.replies) {
                sortReplies(comment.replies, reply)
            }
        } else {
            const position = comments.map(element => { return element.id }).indexOf(reply.id);
            if (position === -1) {
                comments.push(reply)
            }
        }
    })
    return comments
}