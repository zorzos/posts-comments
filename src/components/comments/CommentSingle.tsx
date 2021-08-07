import * as React from 'react'
import { Comment } from 'antd'
import ReplyEditor from './ReplyEditor'

const replyTo = (value: string) => {
    console.log(value)
}

function CommentSingle(props: {
    body: string,
    username: string,
    currentPostId: number
}) {
    const [showReplyEditor, setShowReplyEditor] = React.useState(false)

    const {
        body,
        username,
        currentPostId
    } = props
    return (
        <span>
            <Comment
                actions={[
                    <span 
                        key="comment-nested-reply-to"
                        onClick={() => setShowReplyEditor(!showReplyEditor)}
                    >
                        Reply to
                    </span>
                ]}
                author={username}
                content={<p>
                    {body}
                </p>}
            />
            {showReplyEditor && 
                <ReplyEditor
                    addComment={replyTo}
                    currentPostId={currentPostId}
                />
            }
        </span>
    )
}

export default CommentSingle
