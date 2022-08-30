import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import styles from './styles.module.css';

// https://ant.design/components/menu/

// After version 4.20.0, we provide a simpler usage <Menu items={[...]} /> with better perfermance and potential of writing simpler code style in your applications. Meanwhile, we deprecated the old usage in browser console, we will remove it in antd 5.0.

const menuItems = [
  {
    label: (
      <div className={styles.menuItem}>
        <Link to="/">Home</Link>
      </div>
    ),
    key: '/',
  },
  {
    label: (
      <div className={styles.menuItem}>
        <Link to="/new">New</Link>
      </div>
    ),
    key: '/new',
  },
];

function HeaderMenu() {
  const location = new useLocation();
  return <Menu mode="horizontal" className={styles.headerMenu} items={menuItems} selectedKeys={[location.pathname]} />;
}

export default HeaderMenu;
