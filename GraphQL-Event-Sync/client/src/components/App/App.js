import React from "react";
import { Col, Row } from "antd";
import styles from "./styles.module.css";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import NewPost from "./pages/NewPost/NewPost";
import HeaderMenu from "./HeaderMenu";
import Post from "./pages/Post/Post";
import EventSync from "./pages/EventSync/EventSync";

const App = () => {
  return (
    <div className={styles.container}>
      <Row justify="center">
        <Col span={14}>
          <HeaderMenu />
          <div className={styles.content}>
            <Switch>
              <Route path="/new" component={NewPost} />
              <Route path="/post/:id" component={Post} />
              <Route path="/eventSync" component={EventSync} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default App;
