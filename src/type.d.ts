interface PostType {
    id: number
    title: string
    userId: number
    body: string,
    username: string
}

interface UserType {
    id: number
    username: string
    name: string
    email: string
}

interface CommentType {
    postId: number
    id: number
    email: string
    body: string,
    username: string,
    tag: string[]
}

export {
    PostType,
    UserType,
    CommentType
}