import axios from 'axios'

const baseUrl = 'https://todo-list.alphacamp.io/api';

const axiosInstance = axios.create({baseURL: baseUrl})

axiosInstance.interceptors.request.use(
   (config)=> {
     const token = localStorage.getItem('authToken');
     if (token) {
       config.headers['Authorization'] = `Bearer ${token}`;
     }
     return config;
   },
   (error)=> {
     console.error(error);
  },
);

export const getTodos = async ()=>{
  try {
    const res = await axios.get(`${baseUrl}/todos`)

    return res.data
  } catch(error) {
    console.error('[Get Todos failed]:', error)
  }
}

export const createTodo= async (payload) => {
  try {
    const { title, isDone } = payload
    const res = await axios.post(`${baseUrl}/todos`, { title, isDone }) 

    return res.data
  } catch(error) {
    console.error('[Create Todo failed]:', error)
  } 
} 

export const patchTodo = async (payload) => {
  try {
    const { id, title, isDone} = payload
    const res = await axios.patch(`${baseUrl}/todos/${id}`, { title, isDone })

    return res.data
  } catch(error) {
    console.error('[Patch Todo failed]:', error)
  }
}

export const deleteTodo = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}/todos/${id}`)

    return res.data
  } catch(error) {
    console.error('[Delete Todo failed]:', error)
  }
}