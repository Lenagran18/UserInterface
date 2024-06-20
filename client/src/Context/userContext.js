import{ createContext, useState } from 'react';

const UserContext = createContext(); //Initialized a new context using creatContext
//Provides initial state of user, update the states and props
export function UserProvider({ children }) {
    const[user, setUser] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        authorId: '',
        authenticated: false
    })

    const updateUser = (name, value) => {
        setUser({ ...user, [name]: value });
    }

    return(
        <UserContext.Provider value={{ user, updateUser }}>
            {children} 
        </UserContext.Provider>
    )
}

export default UserContext


