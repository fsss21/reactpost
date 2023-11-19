import { Button, Dialog, TextField } from "@mui/material";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { text } from "stream/consumers";

const FetchPosts = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [posts, setPosts] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editedPost, setEditedPost] = useState<any>({ id: 0, text: "" });

  useEffect(() => {
    getPosts();
  }, []);

  const onChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const onChangeEdited = (event: ChangeEvent<HTMLInputElement>) => {
    setEditedPost({ ...editedPost, text: event.target.value });
  };

  const onSave = async () => {
    await axios.post("https://6559da7b6981238d054ce4f7.mockapi.io/posts", {
      text: inputValue,
    });
    getPosts();
  };

  const getPosts = async () => {
    const posts = (
      await axios.get("https://6559da7b6981238d054ce4f7.mockapi.io/posts")
    ).data;
    setPosts(posts);
  };

  const onDelete = async (id: number) => {
    await axios.delete(
      `https://6559da7b6981238d054ce4f7.mockapi.io/posts/${id}`
    );
    getPosts();
  };

  const saveEdited = async (id: number) => {
    await axios.put(
      `https://6559da7b6981238d054ce4f7.mockapi.io/posts/${editedPost.id}`,
      { text: editedPost.text }
    );
    getPosts();
    setIsOpen(false);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onClickEdit = (post: any) => {
    setEditedPost(post);
    setIsOpen(true);
  };

  return (
    <div>
      <h1>Fetch Posts</h1>
      <div>
        <input onChange={onChange} type="text" />
        <button onClick={onSave}>Сохранить пост</button>
      </div>
      {posts.map((post) => {
        return (
          <h2 key={post.id}>
            {post.text} <button onClick={() => onDelete(post.id)}>X</button>
            <button onClick={() => onClickEdit(post)}>Редактировать</button>
          </h2>
        );
      })}

      <Dialog open={isOpen}>
        <h2 style={{ margin: "20px 50px" }}>Редактировать Пост </h2>
        <TextField
          onChange={onChangeEdited}
          value={editedPost.text}
          label="Редактируемый текст"
          sx={{ margin: "20px" }}
        />
        <Button onClick={onClose}>Отменить</Button>
        <Button
          onClick={saveEdited}
          variant="contained"
          sx={{ margin: "20px" }}
        >
          Редактировать
        </Button>
      </Dialog>
    </div>
  );
};

export default FetchPosts;
