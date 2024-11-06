import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { Unsubscribe } from "firebase/auth";
import {
  Box,
  BoxTop,
  Day,
  DogName,
  Text,
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
  dog: string;
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
          const { board, date, title, userId, username, youtbue, dog } =
            item.data();
          return {
            board,
            date,
            title,
            userId,
            username,
            youtbue,
            dog,
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
            <BoxTop>
              <Day>{docs.date}</Day>
              <Title>{docs.title}</Title>
              <Text>{docs.board}</Text>
              <div>
                <DogName>{docs.dog}</DogName>
              </div>
              {docs.youtbue ? (
                <Video
                  src="https://cdn.iconscout.com/icon/free/png-256/free-youtube-104-432560.png?f=webp"
                  alt="유튜브 로고"
                />
              ) : (
                ""
              )}
            </BoxTop>
            <User>{docs.username}</User>
          </Write>
        ))}
      </Box>
    </Wrapper>
  );
};

export default Board;
