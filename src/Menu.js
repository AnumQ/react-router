import React from "react";
import { Link } from "./Router";

export function Menu({ currentPath }) {
  const menuItems = [
    { path: "/", title: "Home" },
    { path: "/articles", title: "Articles" },
    { path: "/about", title: "About" },
  ];

  return (
    <nav className="menu">
      <ul>
        {menuItems.map((item, index) => {
          return (
            <li
              key={`item-${index}`}
              className={currentPath === item.path ? "selected" : ""}
            >
              <Link href={item.path}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
