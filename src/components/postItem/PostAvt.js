import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { db } from "../../firebase-app/firebase-config";
import { useState } from "react";

const PostAvt = ({ data }) => {
  const [user, setUser] = useState("");
  useEffect(() => {
    if (!data?.id) return;
    async function fetchData() {
      const colRef = doc(db, "users", data?.id);
      const dataDoc = await getDoc(colRef);
      setUser(dataDoc.data());
    }
    fetchData();
  }, [data?.id]);
  return (
    <div className="w-12 h-12 mx-2 rounded-full object-cover">
      <img
        src={
          user?.imageUser?.imageAvt ||
          data?.imageUser?.imageAvt ||
          "/user-avt.png"
        }
        alt=""
        className="w-full h-full rounded-full object-cover"
      />
    </div>
  );
};

export default PostAvt;
