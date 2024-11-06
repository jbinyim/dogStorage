import React, { useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
`;

const Input = styled.input`
  width: 80%;
  height: 41px;
  padding: 0 10px;
  border-radius: 8px;
  border: 1px solid #d8dde3;
  box-shadow: 0 0 4px #4b4c4e;
  &:focus {
    outline: none;
  }
  &:nth-child(2) {
    width: 20%;
  }
  &:last-child {
    cursor: pointer;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 250px;
  padding: 10px;
  font-size: 18px;
  border-radius: 8px;
  border: 1px solid #d8dde3;
  box-shadow: 0 0 4px #4b4c4e;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const Writing = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [board, setBoard] = useState("");
  const [youtbue, setYoutbue] = useState("");
  const [dog, setDog] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "title") {
      setTitle(value);
    } else if (name === "date") {
      setDate(value);
    } else if (name === "youtbue") {
      setYoutbue(value);
    } else if (name === "dog") {
      setDog(value);
    }
  };

  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBoard(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user || title === "" || date === "" || board === "" || dog === "")
      return;

    try {
      setLoading(true);
      await addDoc(collection(db, "board"), {
        title,
        date,
        board,
        youtbue,
        dog,
        username: user.displayName || "o o",
        userId: user.uid,
      });

      navigate("/");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChangeInput}
          name="title"
          value={title}
          type="text"
          placeholder="제목"
          required
        />
        <Input
          onChange={onChangeInput}
          name="date"
          value={date}
          type="date"
          required
        />
        <Textarea
          onChange={onChangeText}
          name="board"
          value={board}
          rows={5}
          placeholder="설명"
          required
        />
        <Input
          onChange={onChangeInput}
          name="youtbue"
          value={youtbue}
          type="text"
          placeholder="유튜브 영상ID"
        />
        <Input
          name="dog"
          onChange={onChangeInput}
          value={dog}
          type="text"
          placeholder="반려동물 이름"
        />
        <Input
          type="submit"
          value={isLoading ? "Loading..." : "게시글 올리기"}
        />
      </Form>
    </Wrapper>
  );
};

export default Writing;
