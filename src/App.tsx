import { LoginRouter, MainRoute } from "./routes/MainRoutes"
import { useEffect, useState } from "react";
import { Aside } from "./components/aside";
import { Header } from "./components/header";
import { ContextProvider } from './contexts/context'
import { AddUserType, isLogged } from './Api'
import Api from './Api'
import './App.css';

const App = () => {
    const [user, setUser] = useState<AddUserType | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getTokenLogin()
    }, [])

    const getTokenLogin = async () => {
        const token = isLogged()
        if (token) {
            const newUser = await Api.getToken(token)
            if (newUser.email !== undefined) {
                setUser(newUser)
            }
        }
        setLoading(false)
    }

    const handleUser = (user: AddUserType | null) => setUser(user)

    if (loading) {
        return <div></div>
    }

    return (
        <>
            {user === null &&
                <LoginRouter
                    newUser={handleUser}
                />
            }
            {user !== null &&
                <div className="container">
                    <Aside user={user} />
                    <div className="rightside">
                        <Header
                            user={user}
                            setNewUser={handleUser}
                        />
                        <main className="main">
                            <ContextProvider>
                                <MainRoute
                                    user={user}
                                />
                            </ContextProvider>
                        </main>
                    </div>
                </div>
            }
        </>
    )
}

export default App
