import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Input, Button, Card } from "antd";
import styles from "./GuessComponents.module.css";

const Guess = () => {
  const [name, setName] = useState("");
  const [ageData, setAgeData] = useState(null);

  const handleFetchData = () => {
    if (!name.trim()) {
      window.alert("Write down your name first!");
      return;
    }

    fetch(`https://api.agify.io/?name=${name}`)
      .then((response) => response.json())
      .then((data) => {
        setAgeData(data);
      })
      .catch((error) => {
        console.error("Error fetching age data:", error);
        setAgeData(null); // Reset on error
      });
  };

  return (
    <>
      <div className="container">
        <Input
          className={styles.input}
          size="medium"
          placeholder="Write down your name!"
          prefix={<UserOutlined />}
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: 300 }}
        />
        <Button className={styles.button} onClick={handleFetchData}>
          Get results!
        </Button>
        {ageData && (
          <Card
            className={styles.card}
            title="Card title"
            bordered={false}
            style={{ width: 300 }}
          >
            <p>Card content</p>
            <p>Name: {ageData.name}</p>
            <p>Age: {ageData.age}</p>
            <p>Count: {ageData.count}</p>
          </Card>
        )}{" "}
      </div>
    </>
  );
};

export default Guess;
