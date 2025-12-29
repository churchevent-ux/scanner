import UsersPage from "./pages/users";
import HomePage from "./pages";
import LoginPage from "./pages/login";
import SignInPage from "./pages/signin";
import SignOutPage from "./pages/signout";
import StoreInPage from "./pages/storein";
import StoreOutPage from "./pages/storeout";
import { useEffect, useState } from "react";
import { setCred } from "./module/firebase";
import BreakOutPage from "./pages/breakout";
import BreakInPage from "./pages/breakin";

export const appTitle = "CHARIS Scanner (v1.1.0)";

export default function App() {
  const [path, setpath] = useState("login");

  const _setpath = (path: string) => {
    localStorage.setItem("path", path);
    setpath(path);
  };

  useEffect(() => {
    const isLogin = sessionStorage.getItem("is_login") || "0";
    if (isLogin !== "1") setpath("login");
    else setCred(_setpath);
  }, []);

  return (
    <div>
      {path === "login" && <LoginPage setPath={_setpath} />}
      {path === "home" && <HomePage setPath={_setpath} />}
      {path === "signin" && <SignInPage setPath={_setpath} />}
      {path === "signout" && <SignOutPage setPath={_setpath} />}
      {path === "storein" && <StoreInPage setPath={_setpath} />}
      {path === "storeout" && <StoreOutPage setPath={_setpath} />}
      {path === "breakin" && <BreakInPage setPath={_setpath} />}
      {path === "breakout" && <BreakOutPage setPath={_setpath} />}
      {path === "users" && <UsersPage setPath={_setpath} />}
      {/* DEFAULT FALLBACK */}
      {![
        "login",
        "home",
        "signin",
        "users",
        "signout",
        "storein",
        "storeout",
        "breakin",
        "breakout",
      ].includes(path) && <HomePage setPath={_setpath} />}
    </div>
  );
}
