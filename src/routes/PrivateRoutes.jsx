import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/common/Header";
import ProfileProvider from "../providers/ProfileProvider";

export default function PrivateRoutes() {
  const { auth } = useAuth();
 // console.log(auth);
  return (
    <>
      {auth.authToken ? (
        <>
        <ProfileProvider>
          <Header />
         {/*  <p>{JSON.stringify(auth)}</p> */}
          <main className="mx-auto max-w-[1020px] py-8">
            <div className="container">
              <Outlet />
            </div>
          </main>
          </ProfileProvider>
        </>
      ) : (
        <Navigate to="/login " />
      )}
    </>
  );
}
