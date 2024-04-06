import React from "react";
import { Link } from "./Router";
import { useGlobalContext } from "./GlobalContextProvider";

export function Menu() {
  const { currentPath } = useGlobalContext();
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
              className={isItemSelected(currentPath, item) ? "selected" : ""}
            >
              <Link href={item.path}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
function isItemSelected(currentPath, item) {
  const path = item.path;
  const pathWithoutSlash = path.slice(1);
  const currentPathWithoutSlash = currentPath.slice(1);

  // Add this check ti make sure root url is handled separately
  if (currentPathWithoutSlash !== "" && pathWithoutSlash !== "") {
    return currentPathWithoutSlash.includes(pathWithoutSlash);
  }
  return currentPathWithoutSlash === pathWithoutSlash;
}
