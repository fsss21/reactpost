import { Button, Dialog } from "@mui/material";
import { ChangeEvent, useState } from "react";

interface IPost {
  text: string;
  id: number;
}

const Posts = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const savePost = () => {
    setPosts([...posts, { id: Math.random() * 10000000, text: inputValue }]);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onDelete = (id: number) => {
    const newPosts = posts.filter((post) => post.id !== id);

    setPosts(newPosts);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  console.log(posts);
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
            <button onClick={onOpen}>Редактировать</button>
          </h2>
        );
      })}

      <Dialog open={isOpen}>
        <h2 style={{ margin: "20px" }}>Редактировать пост</h2>
        <Button onClick={onClose} sx={{ margin: "20px" }}>
          Отменить
        </Button>
      </Dialog>
    </div>
  );
};

export default Posts;
