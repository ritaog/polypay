import React, { useState, useEffect } from "react";
import axios from "axios";

const Welcome = () => {
  const [message, setMessage] = useState("");

  //grab text from backend once page is rendered
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://localhost:5000/api/welcome");
      setMessage(response.data);
    };

    getData();
  }, []);

  return (
    <div>
      <h1>Polypay says: {message}</h1>
    </div>
  );
};

export default Welcome;
