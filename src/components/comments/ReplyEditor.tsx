import * as React from 'react'
import { Form, Button, Input, Select, Row, Col } from 'antd'
import { CommentToAddType } from '../../type'
const { TextArea } = Input
const { Option } = Select
const tagOptions = [
    'amazing',
    'sad',
    'angry',
    'happy',
    'fantastic'
]

function ReplyEditor(props: {
    commentId?: number,
    addComment: (comment: CommentToAddType) => void,
    currentPostId: number,
}) {
    const [submitting, setSubmitting] = React.useState(false)
    const [comment, setComment] = React.useState("")
    const [selectedTags, setSelectedTags] = React.useState([])
    const [tags, setTags] = React.useState([])
    const [error, setError] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")

    React.useEffect(() => {
        let selectOptions: JSX.Element[] = []
        tagOptions.forEach((tag) => {
            selectOptions.push(<Option key={tag} value={tag}>{tag}</Option>)
        })
        setTags(selectOptions as never[])
    }, [])

    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value)
    }

    const onSubmit = () => {
        if (comment) {
            setSubmitting(true)
            const commentToAdd: CommentToAddType = {
                postId: props.currentPostId,
                body: comment,
                email: 'rafail.zorzos@gmail.com',
                tags: selectedTags,
                username: "Zedar",
                replyingTo: props.commentId ? props.commentId : undefined
            }
            props.addComment(commentToAdd)
            setComment("")
            setSelectedTags([])
            setSubmitting(false)
        } else {
            setError(true)
            setErrorMessage("Comment field cannot be empty")
        }
    }

    const handleChange = (value: string) => { 
        setSelectedTags(value as never)
    }

    return (
        <span>
            <Form.Item>
                <TextArea 
                    rows={4}
                    onChange={onChange}
                    value={comment}
                    maxLength={500}
                    showCount={true}
                    allowClear
                />
                {error && <span>{errorMessage}</span>}
            </Form.Item>
            <Form.Item>
                <Row>
                    <Col span={3}>
                        <Button 
                            htmlType="submit"
                            loading={submitting}
                            type="primary"
                            onClick={onSubmit}
                        >
                            Add Comment
                        </Button>
                    </Col>
                    <Col span={21}>
                        <Select
                            mode="multiple"
                            placeholder="Please select one or more tags"
                            onChange={handleChange}
                            value={selectedTags as never}
                        >
                            {tags}
                        </Select>
                    </Col>
                </Row>
            </Form.Item>
        </span>
    )
}

export default ReplyEditor
