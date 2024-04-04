import React, { useEffect, useState } from "react";

function Router(props) {
  const { children } = props;
  const [CurrentComponent, setCurrentComponent] = useState();

  let routes = [];
  if (children && children.props && children.props.path) {
    routes.push(children.props);
  } else {
    if (children && children.length > 0) {
      routes = children.map((child) => child.props);
    }
  }

  const handleNavigation = () => {
    const routeMatch = routes.find(({ path, isDynamic }) => {
      const regex = new RegExp(`^${path.replace(/:\w+/g, "\\w+")}$`);
      const regexTest = regex.test(window.location.pathname);
      const pathIsEqualToLocalPath = path === window.location.pathname;
      return isDynamic ? regexTest : pathIsEqualToLocalPath;
    });

    if (routeMatch) {
      if (routeMatch.isDynamic) {
        // Extract dynamic segments here, for simplicity assuming only one dynamic segment
        const routeId = window.location.pathname.split("/").pop();
        const routeWithId = () => <routeMatch.component id={routeId} />;
        setCurrentComponent(() => routeWithId);
      } else {
        setCurrentComponent(() => routeMatch.component);
      }
    }
  };

  const popStateTiggered = () => {
    handleNavigation();
  };

  useEffect(() => {
    window.addEventListener("popstate", popStateTiggered);

    handleNavigation();

    return () => {
      window.removeEventListener("popstate", popStateTiggered);
    };
  }, []);

  if (!CurrentComponent) {
    return <div></div>;
  }

  return <CurrentComponent />;
}

function Route(props) {
  return props;
}

function Link(props) {
  const { children, href } = props;
  const onClick = (e) => {
    e.preventDefault(); // Prevent the default anchor link behavior

    // Use history.pushState to change the URL without reloading the page
    window.history.pushState({}, "", href);

    // Dispatch event
    window.dispatchEvent(new Event("popstate"));
  };

  return (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  );
}

export { Route, Link, Router };
