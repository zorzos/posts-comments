import { Divider } from 'antd'
import { CommentType } from '../../type'
import CommentSingle from './CommentSingle'
import ReplyEditor from './ReplyEditor'

const replyTo = (value: string) => {
    console.log(value)
}

function CommentList(props: {
    comments: CommentType[],
    currentPostId: number
}) {
    const { comments, currentPostId } = props
    return (
        <div className="comment-list">
            {comments.length > 0 && comments.map((comment: CommentType) => {
                return (
                    <div key={comment.id}>
                        <CommentSingle
                            body={comment.body}
                            username={comment.username ? comment.username : comment.email}
                            currentPostId={currentPostId}
                        />
                        <Divider />
                    </div>
                )
            })}
            {currentPostId !== -1 && 
                <ReplyEditor
                    addComment={replyTo}
                    currentPostId={currentPostId}
                />
            }
        </div>
    )
}

export default CommentList