import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/common/Header";

export default function PrivateRoutes() {
  const { auth } = useAuth();
 // console.log(auth);
  return (
    <>
      {auth.user ? (
        <>
          <Header />
         {/*  <p>{JSON.stringify(auth)}</p> */}
          <main className="mx-auto max-w-[1020px] py-8">
            <div className="container">
              <Outlet />
            </div>
          </main>
        </>
      ) : (
        <Navigate to="/login " />
      )}
    </>
  );
}
