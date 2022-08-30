import React from "react";
import { Menu } from "antd";
import styles from "./styles.module.css";
import { Link, useLocation } from "react-router-dom";

const HeaderMenu = () => {
  const location = useLocation();
  return (
    <Menu
      mode="horizontal"
      selectedKeys={location.pathname}
      className={styles.headerMenu}
    >
      <Menu.Item key="/" className={styles.menuItem}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="/new" className={styles.menuItem}>
        <Link to="/new">New Post</Link>
      </Menu.Item>
      <Menu.Item key="/eventSync" className={styles.menuItem}>
        <Link to="/eventSync">Event Sync</Link>
      </Menu.Item>
    </Menu>
  );
};

export default HeaderMenu;
