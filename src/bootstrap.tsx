import React from "react";
import { createRoot } from "react-dom/client";
import Profile from "./profile";
import "./index.css";

const root = createRoot(document.getElementById("root")!);
root.render(<Profile />);