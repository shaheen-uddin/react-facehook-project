import React, { useReducer } from 'react'
import { initialState, profileReducer } from '../reducer/ProfileReducer'
import { ProfileContext } from '../context';

export default function ProfileProvider({children}) {
    const [state, dispatch ] = useReducer(profileReducer, initialState);
  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  )
}
