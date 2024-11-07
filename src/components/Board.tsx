import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { Unsubscribe } from "firebase/auth";
import { boardInfoState } from "../atom";
import { useRecoilState } from "recoil";
import { IBoard } from "../atom";
import { useNavigate } from "react-router-dom";
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

const Board = () => {
  const [board, setBoard] = useState<IBoard[]>([]);
  const [boardInfo, setBoardInfo] = useRecoilState(boardInfoState);
  const navigate = useNavigate();

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

  const onClick = (docs: IBoard) => {
    setBoardInfo(docs);
    navigate(`/story/${docs.id}`);
  };

  return (
    <Wrapper>
      <Box>
        {board.map((docs) => (
          <Write key={docs.id} onClick={() => onClick(docs)}>
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
