import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';

export default function ProfilePage() {
  const [ user, setUser ] = useState(null);
  const [ posts, setPosts ] = useState([]);
  const [loading, setLoading ] = useState(false);
  const [error, setError ] = useState(null);

  const { api } = useAxios();
  const { auth } = useAuth();

 // console.log(auth);
  useEffect(() => {
  //  console.log(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`);
    setLoading(true);
    const fetchProfile = async () => {
      try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`);
      //  console.log(response.data);
        setUser(response?.data.user);
        setPosts(response?.data?.posts);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);
 console.log(user);
  if(loading) return <div className='text-3xl font-semibold'>Loading profile...</div>
  return (
    <div className='text-xl font-semibold'>
     Welcom,  {  user?.firstName } you have {posts?.length } posts.
     </div>
  )
}
