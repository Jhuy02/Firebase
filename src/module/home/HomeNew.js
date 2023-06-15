import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import NewItem from "./NewItem";

const HomeNew = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    onSnapshot(colRef, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
        results.sort((a, b) => b.timestamp - a.timestamp);
        setPosts(results);
      });
    });
  }, []);
  if (posts.length <= 0) return null;
  return (
    <div className="post">
      {posts.map((post) => (
        <NewItem key={post.id} data={post}></NewItem>
      ))}
    </div>
  );
};

export default HomeNew;
