import React from "react";
import ReactDOM from "react-dom";
import JSXDevRuntime from "react/jsx-dev-runtime";
import JSXRuntime from "react/jsx-runtime";

export const defineReact = () => {
  const w = typeof window === "object" ? window : (globalThis as any);

  w.React = React;
  w.ReactDOM = ReactDOM;
  w.JSXRuntime = JSXRuntime;
  w.JSXDevRuntime = JSXDevRuntime;
  w.Fragment = React.Fragment;
};
