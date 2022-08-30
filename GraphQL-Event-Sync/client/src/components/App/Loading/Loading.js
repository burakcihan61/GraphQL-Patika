import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import styles from "./styles.module.css";

function Loading() {
  return (
    <div className={styles.loading}>
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 32,
            }}
            spin
          />
        }
      />
    </div>
  );
}

export default Loading;
