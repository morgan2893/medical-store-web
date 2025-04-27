import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "../styles/bottomTabs.module.css";

const BottomTabs = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const tabs = [
    { name: "🏠", path: "/" },
    { name: "💊", path: "/medicines" },
    { name: "👥", path: "/customers" },
    { name: "💵", path: "/transactions" },
    { name: "🧑‍💼", path: "/profile" },
  ];

  return (
    <div className={styles.tabBar}>
      {tabs.map((tab) => (
        <NavLink
          key={tab.name}
          to={tab.path}
          className={({ isActive }) =>
            currentPath === tab.path
              ? `${styles.tabItem} ${styles.active}`
              : styles.tabItem
          }
        >
          {tab.name}
        </NavLink>
      ))}
    </div>
  );
};

export default BottomTabs;
