import * as React from 'react'
import { Comment, Tag } from 'antd'
import { CommentToAddType, CommentType } from '../../type'
import ReplyEditor from './ReplyEditor'

function CommentSingle(props: {
    id: number
    body: string,
    username: string,
    currentPostId: number,
    tags: string[],
    replies?: CommentType[],
    addComment: (comment: CommentToAddType) => void
}) {
    const [showReplyEditor, setShowReplyEditor] = React.useState(false)

    const addNestedComment = (comment: CommentToAddType) => {
        setShowReplyEditor(false)
        addComment(comment)
    }

    const {
        id,
        body,
        username,
        currentPostId,
        tags,
        replies,
        addComment
    } = props
    const tempTags = tags?.map((tag: string) => {
        return <Tag key={tag}>{tag}</Tag>
    })
    const newUsername = <span>
        <div>{username}</div>
        <span>{tempTags}</span>
    </span>
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
                author={newUsername}
                content={<p>
                    {body}
                </p>}
            >
                {replies && replies.length > 0 && replies.map(reply => {
                    return <CommentSingle
                        id={reply.id}
                        body={reply.body}
                        username={reply.username ? reply.username : reply.email}
                        currentPostId={currentPostId}
                        tags={reply.tags}
                        addComment={addComment}
                        replies={reply.replies}
                    />
                })}
            </Comment>
            {showReplyEditor && 
                <ReplyEditor
                    commentId={id}
                    addComment={addNestedComment}
                    currentPostId={currentPostId}
                />
            }
        </span>
    )
}

export default CommentSingle
