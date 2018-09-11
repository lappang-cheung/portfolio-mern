import axios from 'axios'
import { GET_ERRORS } from './types'

// Register user
export const registerUser = (userData, history) => dispatch => {
    axios.post('/users/register', userData)
        .then(res => history.push('/admin/login'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}