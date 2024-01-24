import { createContext, useContext, useEffect, useState } from "react";
import { auth, database } from "../misc/firebase";
import { onValue, ref } from "firebase/database";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let userRef;

    const authUnsub = auth.onAuthStateChanged((authOb) => {
      if (authOb) {
        const profilesRef = ref(database, `/profiles/${authOb.uid}`);
        onValue(profilesRef, (snap) => {
          const { name, createdAt } = snap.val();
          const data = {
            name,
            createdAt,
            uid: authOb.uid,
            email: authOb.email,
          };
          setProfile(data);
          setIsLoading(false);
        });
      } else {
        if (userRef) {
          userRef.off();
        }
        setProfile(null);
        setIsLoading(false);
      }
    });

    return () => {
      authUnsub();
      if (userRef) {
        userRef.off();
      }
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
