import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth-slice";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";
import axios from "../../axios";

export const AddPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isAuth = useSelector(selectIsAuth);
  const inputFileRef = useRef(null);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const isEditing = id;
  useEffect(() => {
    if (id) {
      axios.get(`/post/${id}`).then(({ data }) => {
        setText(data.text);
        setTitle(data.title);
        setImageUrl(data.imageUrl);
        setTags(data.tags);
      });
    }
  }, [id]);

  const handleChangeFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);
    const { data } = await axios.post("/upload", formData);
    setImageUrl(`http://localhost:5000${data.url}`);
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  const submitHandle = async () => {
    try {
      const fields = {
        title,
        text,
        imageUrl,
        tags: tags.split(","),
      };
      const { data } = isEditing
        ? await axios.put(`/post/${id}`, fields)
        : await axios.post("/post", fields);

      const _id = isEditing ? id : data._id;
      navigate(`/posts/${_id}`);
    } catch (e) {
      console.log(e);
      alert("Post yuklashda xatolik");
    }
  };

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        variant="outlined"
        size="large"
        onClick={() => inputFileRef.current.click()}
      >
        Загрузить превью
      </Button>
      <input
        type="file"
        onChange={handleChangeFile}
        hidden
        ref={inputFileRef}
      />
      {imageUrl && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={() => setImageUrl("")}
          >
            Удалить
          </Button>
          <img className={styles.image} src={imageUrl} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={submitHandle} size="large" variant="contained">
          {isEditing ? "Tahrirlash" : "Qo'shish"}
        </Button>
        <Link to="/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};
