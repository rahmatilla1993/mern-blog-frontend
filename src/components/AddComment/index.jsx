import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "../../axios";
import { useState } from "react";

export const Index = ({ postId }) => {
  const [value, setValue] = useState("");

  const clickHandle = () => {
    axios
      .post(`/post/comments/${postId}`, { text: value })
      .then(() => {
        alert("Izoh qo'shildi!!!");
      })
      .catch((err) => {
        console.log(err);
        alert("Izoh qo'shishda xatolik");
      })
      .finally(() => {
        setValue("");
      });
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            onChange={(e) => setValue(e.target.value)}
          />
          <Button onClick={clickHandle} variant="contained">
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
