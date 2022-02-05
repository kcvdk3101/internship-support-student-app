import { createSlice } from '@reduxjs/toolkit'
import { User } from '../models/user'

type AuthenticationSliceStateProps = {
  user: User
  isAuthenticated: boolean
}

const initialState: AuthenticationSliceStateProps = {
  user: {
    firstName: 'Khoi',
    lastName: 'Vuong',
    phone: '0934105563',
    email: '18DH110815@st.huflit.edu.vn',
    image: 'https://picsum.photos/200',
    cvList: [],
  },
  isAuthenticated: false,
}

const authenticationSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {},
})

export default authenticationSlice.reducer
