import { auth, db } from '@/config/firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const useGetCurrentUserData = () => {
  const [userData, setUserData] = useState<any>(null);
  const [userDataLoading, setUserDataLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log('no such document!');
          }
        }
      } catch (error: any) {
        console.log('error fetching user data', error);
      } finally {
        setUserDataLoading(false);
      }
    };
    fetchUser();
  }, []);

  return { userData, userDataLoading };
};

export default useGetCurrentUserData;
