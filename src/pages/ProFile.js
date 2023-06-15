import React, { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Layout from "../components/layout/Layout";
import { useSearchParams } from "react-router-dom";
import HomeProfile from "../module/home/HomeProfile";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-app/firebase-config";

const ProFile = () => {
  const [params] = useSearchParams();
  const paramId = params.get("id");
  const [user, setUser] = useState([]);
  useEffect(() => {
    if (paramId !== "") {
      async function fetchData() {
        const colRef = doc(db, "users", paramId);
        const dataDoc = await getDoc(colRef);
        setUser(dataDoc.data());
      }
      fetchData();
    } else {
      setUser([]);
    }
  }, [paramId]);
  document.title = "ProFile - " + user.username;
  return (
    <div className="flex w-[1180px] m-auto">
      <Sidebar></Sidebar>
      <Layout title={`${user.fullname}`}>
        <HomeProfile></HomeProfile>
      </Layout>
    </div>
  );
};

export default ProFile;
