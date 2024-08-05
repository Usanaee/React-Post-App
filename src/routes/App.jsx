import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Component/Header/Header";
import Fotter from "../Component/Fotter/Fotter";
import Sidebar from "../Component/Sidebar/Sidebar";
import { useState } from "react";
import PostListProvider from "../Store/PostListStore";
import { Outlet } from "react-router-dom";

function App() {
  let [selectTab, setSelectTab] = useState("Home");
  return (
    <div className="app-container">
      <PostListProvider>
        <Sidebar selectTab={selectTab} setSelectTab={setSelectTab} />
        <div className="flexColume-container">
          <Header />
          {/* {selectTab === "Home" ? <PostList /> : <CreatePost />} */}
          <Outlet />
          <Fotter />
        </div>
      </PostListProvider>
    </div>
  );
}

export default App;
