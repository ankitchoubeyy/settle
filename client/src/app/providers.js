"use client";

import { Provider } from "react-redux";
import store from "@/redux/store";
import { useEffect } from "react";
import axios from "axios";
import { setUser } from "@/redux/slices/authSlice.js";

axios.defaults.withCredentials = true;

export default function Providers({ children }) {
  // Hydrate Redux from backend on initial load
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/me")
      .then((res) => {
        if (res.data?.user) {
          store.dispatch(setUser(res.data.user));
        }
      })
      .catch(() => {
        // Not logged in — ignore
      });
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
