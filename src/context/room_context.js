import { createContext, useEffect, useState } from "react";
import { database } from "../misc/firebase";
import { onValue, ref } from "firebase/database";
import { transformtoArrWithId } from "../misc/helpers";

const RoomsContext = createContext();

export const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    const roomListRef = ref(database, "rooms");

    onValue(roomListRef, (snap) => {
      const data = transformtoArrWithId(snap.val());
      setRooms(data);
    });

    return () => {
      roomListRef.off();
    };
  }, []);

  return (
    <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
  );
};
