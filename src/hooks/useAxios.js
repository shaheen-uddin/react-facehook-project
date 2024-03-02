import React, { useEffect } from 'react'
import { api } from '../api';
import useAuth from './useAuth';
import axios from 'axios';

export default function useAxios() {
    const { auth, setAuth } = useAuth();

    useEffect(() => {
        //Add a request interceptor
      const requestIntecept =  api.interceptors.request.use(
            (config) => {
            const authToken = auth?.authToken;
            if(authToken) {
                config.headers.Authorization = `Bearer ${authToken}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
        )

        //add a response interceptor
      const responseIntercept =  api.interceptors.response.use(
            (response) =>  response, 
            async (error) => {
                const originalRequest = error.config;
                if(error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        const refreshToken = auth?.refreshToken;
                      const response =  await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`, {refreshToken});
                        const { token } = response.data;
                        console.log(`New Token: ${token}`);
                        setAuth({...auth, authToken: token});
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return axios(originalRequest);
                    } catch (err) {
                        console.log(err);
                        throw err;
                   } 
                }
                return Promise.reject(error);
            }
        );
        return () => {
            api.interceptors.request.eject(requestIntecept);
            api.interceptors.response.eject(responseIntercept);
        }
    }, [auth.authToken]);
  return {api}
}
