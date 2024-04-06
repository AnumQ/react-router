import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useContext,
} from "react";
import { useGlobalContext } from "./GlobalContextProvider";

function Router({ children }) {
  const { currentPath, setCurrentPath } = useGlobalContext();
  const [CurrentComponent, setCurrentComponent] = useState();

  console.log("Router is rendered");
  const generateRoutes = () => getRoutes(children); // function that returns routes based on children
  // Cache the computed value of getRoutes so it is not generated multiple times
  // Only if children change, the value will be re-computed
  const routes = useMemo(generateRoutes, [children]);

  const handleNavigation = useCallback(() => {
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

      console.log("L38");
      console.info("currentPath:", currentPath);
      console.info("routeMatch.path):", routeMatch.path);
      setCurrentPath(routeMatch.path);
    }
  }, [routes]);

  const popStateTiggered = useCallback(() => {
    handleNavigation();
  }, [handleNavigation]);

  useEffect(() => {
    // To handle navigation on initial load
    handleNavigation();

    // popstate is fired when the active history entry changes while the user navigates the session history.
    //It changes the current history entry to that of the last page the user visited or,
    //if history.pushState() has been used to add a history entry to the history stack, that history entry is used instead.
    window.addEventListener("popstate", popStateTiggered);
    return () => {
      // remove listener on
      window.removeEventListener("popstate", popStateTiggered);
    };
  }, [handleNavigation, popStateTiggered]);

  if (!CurrentComponent) {
    return (
      <div style={{ marginTop: "10rem" }}>
        No component matched for path '{window.location.pathname}'
      </div>
    );
  }

  return <CurrentComponent />;
}

function getRoutes(children) {
  let routes = [];
  if (children && children.props && children.props.path) {
    routes.push(children.props);
  } else {
    if (children && children.length > 0) {
      routes = children.map((child) => child.props);
    }
  }
  return routes;
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
