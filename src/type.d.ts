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
    tags: string[],
    replies: CommentType[],
    replyingTo: number
}

interface CommentToAddType {
    replyingTo: number | undefined,
    postId: number,
    email: string
    body: string,
    username: string,
    tags: string[]
}

export {
    PostType,
    UserType,
    CommentType,
    CommentToAddType
}