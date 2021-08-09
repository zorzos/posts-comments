import * as React from 'react'
import { Divider, Button } from 'antd'
import { CommentType, CommentToAddType } from '../../type'
import CommentSingle from './CommentSingle'
import ReplyEditor from './ReplyEditor'

function CommentList(props: {
    comments: CommentType[],
    currentPostId: number,
    addComment: (comment: CommentToAddType) => void
}) {
    const [showReplyEditor, setShowReplyEditor] = React.useState(false)
    const { comments, currentPostId, addComment } = props
    return (
        <div className="comment-list">
            {comments.length > 0 && comments.map((comment: CommentType) => {
                return (
                    <div key={comment.id}>
                        <CommentSingle
                            id={comment.id}
                            body={comment.body}
                            username={comment.username ? comment.username : comment.email}
                            currentPostId={currentPostId}
                            tags={comment.tags}
                            addComment={addComment}
                            replies={comment.replies}
                        />
                        <Divider />
                    </div>
                )
            })}
            {currentPostId !== -1 &&
                <Button onClick={() => {setShowReplyEditor(!showReplyEditor)}} type="link">Click to reply to this post</Button>
            }
            {showReplyEditor &&
                <ReplyEditor
                    addComment={addComment}
                    currentPostId={currentPostId}
                />
            }
        </div>
    )
}

export default CommentList