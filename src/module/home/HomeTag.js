import React, { useEffect, useState } from "react";
import ListTag from "./ListTag";
import { collection, limit, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";

const HomeTag = () => {
  const [tag, setTag] = useState([]);
  const [cout, setCout] = useState(5);
  useEffect(() => {
    const colRef = collection(db, "tag");
    const newRef = query(colRef, limit(cout));
    onSnapshot(newRef, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
        setTag(results);
      });
    });
  }, [cout]);
  if (tag?.length <= 0) return null;
  return (
    <div className="tag">
      <div className="pb-2 mx-3 bg-[#f7f9f9] mt-3 rounded-xl">
        <span className="flex text-lg font-medium p-3">Trends for you</span>
        <div className="">
          {tag.map((tag) => (
            <ListTag key={tag.id} data={tag}></ListTag>
          ))}
        </div>
        <button
          onClick={() => {
            if (cout === tag.length) {
              setCout(cout + cout);
            }
          }}
          className="w-full px-3 py-4 text-base text-blue-600 cursor-pointer font-semibold hover:bg-[#00000008]"
        >
          {cout > tag.length ? "Tối Đa" : "Tải Thêm"}
        </button>
      </div>
    </div>
  );
};

export default HomeTag;
