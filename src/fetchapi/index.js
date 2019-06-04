import axios from 'axios'

const API_URL = 'https://checkq-api.herokuapp.com/api/'

export const http = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
})

export const status = {
  start: 'START',
  load: 'LOAD',
  success: 'SUCCESS',
  fail: 'FAIL',
  initial: 'INITIAL',
}

