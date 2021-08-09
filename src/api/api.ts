import axios from 'axios'
import { CommentToAddType } from '../type'

export const getPosts = () => axios.get('https://jsonplaceholder.typicode.com/posts')
export const getUsers = () => axios.get('https://jsonplaceholder.typicode.com/users')
export const getComments = () => axios.get('https://jsonplaceholder.typicode.com/comments')

export const getCommentsTEST = (postId: number) => axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)

export const postComment = (comment: CommentToAddType) =>
    axios.post(
        'https://jsonplaceholder.typicode.com/comments',
        comment
    )