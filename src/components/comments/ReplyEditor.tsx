import * as React from 'react'
import { Form, Button, Input, Select, Row, Col } from 'antd'
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
    addComment: (comment: string) => void,
    currentPostId: number
}) {
    const [submitting, setSubmitting] = React.useState(false)
    const [comment, setComment] = React.useState("")
    const [selectedTags, setSelectedTags] = React.useState([])
    // const [tags, setTags] = React.useState([])
    const currentUsername = "rafail.zorzos@gmail.com"

    // React.useEffect(() => {
    //     let selectOptions: JSX.Element[] = []
    //     tagOptions.forEach((tag) => {
    //         selectOptions.push(<Option key={tag} value={tag}>{tag}</Option>)
    //     })
    //     setTags(selectOptions)
    // }, [])

    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value)
    }

    const onSubmit = () => {
        setSubmitting(true)
        const commentToAdd = {
            postId: props.currentPostId,
            body: comment,
            username: currentUsername,
            tags: selectedTags
        }
        // DISPATCH ACTION FOR ADDING COMMENT
        setComment("")
        setSelectedTags([])
        setSubmitting(false)
    }

    const handleChange = (value: string) => {
        // const tempTags = selectedTags
        // tempTags.push(value)
        // setSelectedTags(tempTags)
    }

    return (
        <span>
            <Form.Item>
                <TextArea rows={4} onChange={onChange} value={comment} />
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
                        >
                            <Option key="happy" value="happy">happy</Option>
                            <Option key="sad" value="sad">sad</Option>
                            <Option key="angry" value="angry">angry</Option>
                            <Option key="amazing" value="amazing">amazing</Option>
                            <Option key="fantastic" value="fantastic">fantastic</Option>
                        </Select>
                    </Col>
                </Row>
            </Form.Item>
        </span>
    )
}

export default ReplyEditor
