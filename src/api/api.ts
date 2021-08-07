import axios from 'axios'

export const getPosts = () => axios.get('https://jsonplaceholder.typicode.com/posts')
export const getUsers = () => axios.get('https://jsonplaceholder.typicode.com/users')
export const getComments = () => axios.get('https://jsonplaceholder.typicode.com/comments')