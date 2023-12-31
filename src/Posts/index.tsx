import { Button, Dialog, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

interface IPost {
  text: string;
  id: number;
}

const Posts = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editedPost, setEditedPost] = useState<IPost>({ id: 0, text: "" });

  const savePost = () => {
    setPosts([...posts, { id: Math.random() * 10000000, text: inputValue }]);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onChangeEdited = (event: ChangeEvent<HTMLInputElement>) => {
    setEditedPost({ ...editedPost, text: event.target.value });
  };

  const onDelete = (id: number) => {
    const newPosts = posts.filter((post) => post.id !== id);

    setPosts(newPosts);
  };

  const onClickEdit = (post: IPost) => {
    setEditedPost(post);
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const saveEdited = () => {
    const newPosts = posts.map((post) =>
      post.id === editedPost.id ? editedPost : post
    );
    setPosts(newPosts);
    setIsOpen(false);
  };

  return (
    <div>
      <h1 className="text-center">Posts</h1>
      <div className="input-wrap">
        <input onChange={onChange} type="text" />
        <button onClick={savePost}>Сохранить пост</button>
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

export default Posts;
