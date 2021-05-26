import axios from "axios"

const API_KEY = process.env.REACT_APP_CAT_API_KEY

const API = {
  get(url, params) {
    return axios.get(url, {
      params: params,
      headers: {
        'X-API-KEY': API_KEY
      }
    })
    .then(response => {
      return response
    })
    .catch(function(error) {
      if (error.response) {
        return error.response
      }
    })
  },

  post(url, params) {
    return axios
      .post(url, params, {
        headers: {
          'X-API-KEY': API_KEY
        }
      })
      .then(response => {
        return response.data
      })
      .catch(function(error) {
        if (error.response) {
          return error.response
        }
      })
  },

  delete(url, params) {
    return axios.delete(url, {
      params: params,
      headers: {
        'X-API-KEY': API_KEY
      }
    })
    .then(response => {
      return response
    })
    .catch(function(error) {
      if (error.response) {
        return error.response
      }
    })
  },

  upload(url, formData, onProgress) {
    return axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-API-KEY': API_KEY
      }
    })
    .then(response => {
      return response
    })
    .catch(function(error) {
      if (error.response) {
        return error.response
      }
    })
  },
}

export default API
