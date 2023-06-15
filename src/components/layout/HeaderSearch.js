import React, { useEffect, useState } from "react";
import IconSearch from "../icons/IconSearch";
import HomeTag from "../../module/home/HomeTag";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import Wrapper from "../popper/Wrapper";
import AccountItem from "../accountItem/AccountItem";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import InputSearch from "../input/InputSearch";
import { debounce } from "lodash";
import IconX from "../icons/IconX";
import useToggle from "../../hooks/useToggle";
import HotAccount from "../../module/home/HotAccount";
import PostItem from "../postItem/PostItem";

const HeaderSearch = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [postResult, setPostResult] = useState([]);
  const [filter, setFilter] = useState("");
  const [isToggled, toggle] = useToggle(false);

  useEffect(() => {
    const colRefUser = collection(db, "users");
    const colRefPost = collection(db, "posts");
    const newRefUser = filter
      ? query(
          colRefUser,
          where("fullname", ">=", filter.trim()),
          where("fullname", "<=", filter.trim() + "\uf8ff")
        )
      : colRefUser;
    const newRefPost = filter
      ? query(
          colRefPost,
          where("content", ">=", filter.trim()),
          where("content", "<=", filter.trim() + "\uf8ff")
        )
      : colRefPost;
    onSnapshot(newRefUser, (snapshot) => {
      let resultsUser = [];
      snapshot.forEach((doc) => {
        resultsUser.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setSearchResult(resultsUser);
    });

    onSnapshot(newRefPost, (snapshot) => {
      let resultsPost = [];
      snapshot.forEach((doc) => {
        resultsPost.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPostResult(resultsPost);
    });
  }, [filter]);

  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 500);

  const handleClearFilter = (e) => {
    setFilter("");
    const input = document.getElementById("myInput");
    input.value = "";
    toggle();
  };

  return (
    <div className="w-[350px]">
      <div className="p-2 fixed max-w-[350px] bg-white w-full">
        <Tippy
          interactive
          visible={isToggled && filter.length > 0}
          onClickOutside={toggle}
          render={(attrs) => (
            <div className="min-w-[350px]" tabIndex="-1" {...attrs}>
              <Wrapper className={"bg-[#cffafa]"}>
                {searchResult.map((data) => (
                  <div key={data.id}>
                    <h4 className="py-[5] px-3 text-xl font-semibold text-[#16182380]">
                      Accounts
                    </h4>
                    <div className="pb-5">
                      <AccountItem data={data} />
                    </div>
                  </div>
                ))}
                {postResult.map((data) => (
                  <div key={data.id}>
                    <h4 className="py-[5] px-3 text-xl font-semibold text-[#16182380]">
                      Posts
                    </h4>
                    <div className="pb-5">
                      <PostItem data={data}></PostItem>
                    </div>
                  </div>
                ))}
              </Wrapper>
            </div>
          )}
        >
          <div className="search">
            <InputSearch
              id="myInput"
              autoComplete="off"
              onChange={handleInputFilter}
              onFocus={toggle}
              className="h-12 rounded-full"
              name="search"
              type="text"
              placeholder="Search..."
            >
              {filter ? (
                <IconX onClick={handleClearFilter}></IconX>
              ) : (
                <IconSearch></IconSearch>
              )}
            </InputSearch>
          </div>
        </Tippy>
      </div>
      <div className="h-[55px]"></div>
      <HomeTag></HomeTag>
      <HotAccount></HotAccount>
    </div>
  );
};

export default HeaderSearch;
