import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { Unsubscribe } from "firebase/auth";
import {
  Box,
  Day,
  Desc,
  Title,
  User,
  Video,
  Wrapper,
  Write,
} from "../styles/boardStyle";

interface IBoard {
  id: string;
  board: string;
  date: string;
  title: string;
  userId: string;
  username: string;
  youtbue?: string;
}

const Board = () => {
  const [board, setBoard] = useState<IBoard[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;

    const fetchBoards = async () => {
      const boardQuery = query(
        collection(db, "board"),
        orderBy("date", "desc")
      );

      unsubscribe = await onSnapshot(boardQuery, (spanshop) => {
        const boards = spanshop.docs.map((item) => {
          const { board, date, title, userId, username, youtbue } = item.data();
          return {
            board,
            date,
            title,
            userId,
            username,
            youtbue,
            id: item.id,
          };
        });
        setBoard(boards);
      });
    };
    fetchBoards();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <Wrapper>
      <Box>
        {board.map((docs) => (
          <Write>
            <Title>{docs.title}</Title>
            <Day>{docs.date}</Day>
            <Desc>{docs.board}</Desc>
            <Video>{docs.youtbue}</Video>
            <User>{docs.username}</User>
          </Write>
        ))}
      </Box>
    </Wrapper>
  );
};

export default Board;
