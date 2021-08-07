import { Card } from 'antd'

function Post(props: {
    title: string, 
    body: string, 
    username: string,
    className: string
}) {
    const {
        title,
        body,
        username,
        className
    } = props
    return (
        <Card
            className={className}
            size="small"
            title={title}
            style={{ width: 300 }}
        >
            <p>{body}</p>
            <p>{username}</p>
        </Card>
    )
}

export default Post