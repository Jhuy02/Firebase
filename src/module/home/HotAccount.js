import React, { useEffect, useState } from "react";
import AccountItem from "../../components/accountItem/AccountItem";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";

const HotAccount = () => {
  const [users, setUsers] = useState([]);
  const [cout, setCout] = useState(5);
  useEffect(() => {
    async function fetchUserData() {
      const q = query(
        collection(db, "users"),
        where("Hot", "==", true),
        limit(cout)
      );
      const querySnapshot = await getDocs(q);
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
        setUsers(results);
      });
    }
    fetchUserData();
  }, [cout]);
  if (users?.length <= 0) return null;
  return (
    <div className="hot-account">
      <div className="pb-2 mx-3 bg-[#f7f9f9] mt-3 rounded-xl">
        <span className="flex text-lg font-medium p-3">Tài Khoản nỗi bật</span>
        <div className="">
          {users.map((data) => (
            <AccountItem key={data.id} data={data} />
          ))}
        </div>
        <button
          onClick={() => {
            if (cout === users.length) {
              setCout(cout + cout);
            }
          }}
          className="w-full px-3 py-4 text-base text-blue-600 cursor-pointer font-semibold hover:bg-[#00000008]"
        >
          {cout > users.length ? "Tối Đa" : "Tải Thêm"}
        </button>
      </div>
    </div>
  );
};

export default HotAccount;
