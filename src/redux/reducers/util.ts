import { CommentType } from "../../type";

export const sortReplies = (comments: CommentType[], replies: CommentType[]) => {
    comments.forEach(comment => {
        replies.forEach(reply => {
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
                    sortReplies(comment.replies, replies)
                }
            } else {
                const position = comments.map(element => { return element.id }).indexOf(reply.id);
                if (position === -1) {
                    comments.push(reply)
                }
            }
        })
    })
    return comments
}