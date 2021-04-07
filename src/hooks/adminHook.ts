import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setNotificationMessage } from "../store/app/actions";
import { NotificationTypes } from "../store/app/types";
import { UserState } from "../store/user/types"
import { GroupMessageValues } from "../types";
import { db } from "../utils/firebaseConfig";

const useAdmin = () => {
    const [users, setUsers] = useState<UserState[]>([]);
    const city = useSelector((state: RootState) => state.location.city);
    const [filter, setFilter] = useState<string>();
    const dispatch = useDispatch();

    const fetchAllUsers = async () => {
        try {
            const usersFromDb = await db.users.get();

            if (usersFromDb.empty) {
                setNotificationMessage('No users found', NotificationTypes.Error, 5);
                return;
            }

            usersFromDb.forEach(user => {
                const userData = user.data();

                setUsers(prevState => ([
                    ...prevState,
                    userData,
                ]));
            });

            if (usersFromDb.size === users.length) {
                dispatch(setNotificationMessage('Users have been fetched from the database', NotificationTypes.Success, 5));
            }
        } catch (error) {
            dispatch(setNotificationMessage(error.message, NotificationTypes.Error, 5));
        }
    }

    useEffect(() => {
        fetchAllUsers();
    }, []);
  
    const sendGroupNotification = async (values: GroupMessageValues) => {
        if (users.length === 0) return;

        if (!city || city === '') {
            dispatch(setNotificationMessage('Could not find your current location.', NotificationTypes.Error, 5));
            return;
        }

        try {
            await Promise.all(users.map(async user => {
                try {
                    if (user.notificationToken && user.notificationToken !== '' && user.lastKnownCity && user.lastKnownCity === city) {
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
                    dispatch(setNotificationMessage(error.message, NotificationTypes.Error, 5));
                }
            }));

            dispatch(setNotificationMessage(`Notification sent to users in the ${city} area`, NotificationTypes.Success, 5));
        } catch (error) {
            dispatch(setNotificationMessage(error.message, NotificationTypes.Error, 5));
        }
    }

    const handleSearch = (value: string) => {
        setFilter(value);
    }

    return {
        users,
        fetchAllUsers,
        sendGroupNotification,
        filter,
        handleSearch,
    }
}

export default useAdmin;