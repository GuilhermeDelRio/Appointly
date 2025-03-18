import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5094/api',
  headers: {
    'Content-Type': 'application/json',
  }
})

export default api