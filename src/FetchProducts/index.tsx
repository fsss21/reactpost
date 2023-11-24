import "./FetchProducts.scss";
import { Button, Dialog, Input, TextField } from "@mui/material";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

interface IProducts {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
}

const FetchProducts = () => {
  // const [inputValue, setInputValue] = useState<string>("");
  const [products, setProducts] = useState<IProducts[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editedProduct, setEditedProduct] = useState<IProducts>({
    id: 0,
    name: "",
    price: "",
    imageUrl: "",
  });

  useEffect(() => {
    getPosts();
  }, []);

  const onChange = (event: any) => {
    const { name, value } = event.target;

    if (name === "nameInput" || name === "priceInput" || name === "urlInput") {
      const fieldName = name.replace(/Input$/, "");
      setEditedProduct((prevProduct) => ({
        ...prevProduct,
        [fieldName]: value,
      }));
    }
  };

  const onChangeEdited = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value,
    });
  };

  const onSave = async () => {
    await axios.post<IProducts>(
      "https://655a10ee6981238d054d1578.mockapi.io/products",
      {
        id: 0,
        name: editedProduct.name,
        price: editedProduct.price,
        imageUrl: editedProduct.imageUrl,
      }
    );
    setEditedProduct({
      id: 0,
      name: "",
      price: "",
      imageUrl: "",
    });
    getPosts();
  };

  const getPosts = async () => {
    try {
      const response = await axios.get(
        "https://655a10ee6981238d054d1578.mockapi.io/products"
      );
      const products: IProducts[] = response.data;
      setProducts(products);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const onDelete = async (id: number) => {
    await axios.delete(
      `https://655a10ee6981238d054d1578.mockapi.io/products/${id}`
    );
    getPosts();
  };

  const saveEdited = async () => {
    await axios.put(
      `https://655a10ee6981238d054d1578.mockapi.io/products/${editedProduct.id}`,
      {
        name: editedProduct.name,
        price: editedProduct.price,
        imageUrl: editedProduct.imageUrl,
      }
    );
    getPosts();
    setIsOpen(false);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onClickEdit = (product: IProducts) => {
    setEditedProduct(product);
    setIsOpen(true);
  };

  return (
    <div className="wrapper">
      <h1 className="wrapper__header">Fetch Products</h1>
      <div>
        <Input name="nameInput" onChange={onChange} />
        <br />
        <Input name="priceInput" onChange={onChange} />
        <br />
        <Input name="urlInput" onChange={onChange} />
        <br />
        <Button variant="contained" onClick={onSave}>
          Сохранить продукт
        </Button>
      </div>
      {products.map((product) => {
        return (
          <div className="wrapper__main-cont" key={product.id}>
            <div className="wrapper__main-box">
              <h3>Наименование: {product.name}</h3>
              <h3>{product.price}$</h3>
              <h3>{product.imageUrl} </h3>
              <button onClick={() => onDelete(product.id)}>X</button>
              <button onClick={() => onClickEdit(product)}>
                Редактировать
              </button>
            </div>
          </div>
        );
      })}

      <Dialog open={isOpen}>
        <h2 style={{ margin: "20px 50px" }}>Редактировать Пост </h2>
        <TextField
          onChange={onChangeEdited}
          value={editedProduct.name}
          name="name"
          label="Изменить имя"
          sx={{ margin: "20px" }}
        />
        <TextField
          onChange={onChangeEdited}
          value={editedProduct.price}
          name="price"
          label="Изменить цену"
          sx={{ margin: "20px" }}
        />
        <TextField
          onChange={onChangeEdited}
          value={editedProduct.imageUrl}
          name="imageUrl"
          label="Изменить ссылку"
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

export default FetchProducts;
