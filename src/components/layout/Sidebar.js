import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FieldConten } from "../field";
import { Button } from "../button";
import { useAuth } from "../../contexts/auth-context";
import Tippy from "@tippyjs/react/headless";
import useToggle from "../../hooks/useToggle";
import Wrapper from "../popper/Wrapper";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase-app/firebase-config";
import { doc, getDoc } from "firebase/firestore";

const Menu = [
  {
    url: "/",
    title: "Home",
    icon: "",
  },
  {
    url: "/blog",
    title: "Blog",
  },
  {
    url: "/Contact",
    title: "Contact",
  },
];

// function getLastName(name) {
//   if (!name) return "uesr";
//   const length = name.split(" ").length;
//   return name.split(" ")[length - 1];
// }

const Sidebar = () => {
  const { userInfor } = useAuth();
  const userId = userInfor?.uid || " ";
  const [isToggled, toggle] = useToggle(false);
  const [user, setUser] = useState([]);
  useEffect(() => {
    if (userId !== "") {
      async function fetchData() {
        const colRef = doc(db, "users", userId);
        const dataDoc = await getDoc(colRef);
        setUser(dataDoc.data());
      }
      fetchData();
    } else {
      setUser([]);
    }
  }, [userId]);
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth);
  };
  return (
    <div className=" flex flex-col grow items-end max-w-[275px] border-r h-full border-s-black">
      <div className="w-[275px]">
        <div className="fixed top-0 w-full max-w-[275px]">
          <div className="flex justify-start px-7">
            <NavLink to="/">
              <img
                srcSet="/logo-signup.png 6x"
                alt="new-blog"
                className="logo mt-2"
              />
            </NavLink>
          </div>
          <ul className="menu mt-2">
            {Menu.map((item) => (
              <li key={item.title}>
                <FieldConten>
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      isActive
                        ? "flex justify-center py-3 px-7 items-center hover:bg-[#0f14191a] rounded-full font-bold"
                        : "flex justify-center py-3 px-7 items-center hover:bg-[#0f14191a] rounded-full "
                    }
                  >
                    {item.title}
                  </NavLink>
                </FieldConten>
              </li>
            ))}
          </ul>
          {!userInfor ? (
            <Button
              elementStyle="blue"
              to="/sign-up"
              center
              style={{ maxWidth: "200px", height: "55px" }}
            >
              Đăng ký
            </Button>
          ) : (
            <Tippy
              interactive
              visible={isToggled}
              onClickOutside={toggle}
              render={(attrs) => (
                <div className="w-[250px]" tabIndex="-1" {...attrs}>
                  <Wrapper
                    className={"bg-[#f8f8f8] py-2 shadow-lg shadow-cyan-500/50"}
                  >
                    <div
                      onClick={() => navigate(`/profile?id=${userInfor?.uid}`)}
                      className="p-2 m-2 rounded-2xl hover:bg-slate-300"
                    >
                      <FieldConten className="mx-1">Profile</FieldConten>
                    </div>
                    <div
                      onClick={handleSignOut}
                      className="p-2 m-2 rounded-2xl hover:bg-slate-300"
                    >
                      <FieldConten className="mx-1">LOG OUT</FieldConten>
                    </div>
                  </Wrapper>
                </div>
              )}
            >
              <div
                onClick={toggle}
                className="mt-3 rounded-[50px] flex items-center justify-evenly p-3 cursor-pointer hover:bg-slate-100"
              >
                <div className="w-12 h-12 min-w-[20%] mr-2 rounded-full object-cover">
                  <img
                    src={user?.imageUser?.imageAvt || "/user-avt.png"}
                    alt=""
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="max-w-[200px] overflow-hidden">
                  <div className="text-xl font-semibold text-black">
                    {userInfor?.displayName}
                  </div>
                  <div className="opacity-50">{userInfor?.email}</div>
                </div>
              </div>
            </Tippy>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
