import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';
import useProfile from '../hooks/useProfile';
import { actions } from '../actions';
import ProfileInfo from '../components/profile/ProfileInfo';
import MyPost from '../components/profile/MyPost';

export default function ProfilePage() {
 const { state, dispatch } = useProfile();

  const { api } = useAxios();
  const { auth } = useAuth();

 // console.log(auth);
  useEffect(() => {
  //  console.log(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`);
    dispatch({type: actions.profile.DATA_FETCHING});
    const fetchProfile = async () => {
      try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`);
      //  console.log(response.data);
      if(response.status === 200){
       // console.log(response.data);
        dispatch({type: actions.profile.DATA_FETCHED, data: response.data});
      }
       
      } catch (err) {
        console.log(err);
        dispatch({type:actions.profile.DATA_FETCHED_ERROR, error: err.message})
      } 
    };
    fetchProfile();
  }, []);

  if(state?.loading) return <div className='text-3xl font-semibold'>Loading profile...</div>
  return (
    <>
      <ProfileInfo />
      <MyPost />
    </>
  )
}
