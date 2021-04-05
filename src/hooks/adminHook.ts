import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { setErrorMessage } from "../store/app/actions";
import { UserState } from "../store/user/types"
import { GroupMessageValues } from "../types";
import { db } from "../utils/firebaseConfig";

const useAdmin = () => {
  const [users, setUsers] = useState<UserState[]>([]);
  const dispatch = useDispatch();

  const fetchAllUsers = async () => {
    try {
      const usersFromDb = await db.users.get();

      if (usersFromDb.empty) {
        setErrorMessage('No users found', 5);
        return;
      }

      usersFromDb.forEach(user => {
        const userData = user.data();

        setUsers(prevState => ([
          ...prevState,
          userData,
        ]));
      });
    } catch (error) {
      dispatch(setErrorMessage(error.message, 5));
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);
  
  const sendGroupNotification = (values: GroupMessageValues) => {
    if (users.length === 0) return;

    users.forEach(async user => {
      try {
        if (user.notificationToken && user.notificationToken !== '') {
          const message = {
            to: user.notificationToken,
            sound: 'default',
            title: values.title,
            body: values.message,
          };
  
          const options = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Accept-encoding': 'gzip, deflate',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
          }
  
          await fetch('https://exp.host/--/api/v2/push/send', options);
        }
      } catch (error) {
        dispatch(setErrorMessage(error.message, 5));
      }
    });
  }

  return {
    users,
    fetchAllUsers,
    sendGroupNotification,
  }
}

export default useAdmin;