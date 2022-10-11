import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios.js";

export const FullPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  console.log(post);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/post/${id}`)
      .then(({ data }) => {
        setPost(data);
      })
      .catch((err) => {
        alert("Post olishda xatolik");
        console.warn(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
    //eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }
  return (
    <>
      <Post {...post} commentsCount={3} isFullPost>
        <p>{post.text}</p>
      </Post>
      <CommentsBlock items={post.comments} isLoading={false}>
        <Index postId={id} />
      </CommentsBlock>
    </>
  );
};
