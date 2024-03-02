import React from "react";
import Header from "../components/common/Header";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { auth } = useAuth();
  //console.log(auth);
  return (
    <div>
      <p>Homepage</p>
      <Link to="/me">Go to Profile Page</Link>
    </div>
  );
}
