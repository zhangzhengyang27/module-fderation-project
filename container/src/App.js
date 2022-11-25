import React, {lazy, Suspense, useState, useEffect} from "react"
import {Router, Route, Switch, Redirect} from "react-router-dom"
import {createBrowserHistory} from "history"

import Header from "./components/Header"
import Progress from "./components/Progress"

const MarketingApp = lazy(() => import("./components/MarketingApp"))
const AuthApp = lazy(() => import("./components/AuthApp"))
const DashboardApp = lazy(() => import("./components/DashboardApp"))

const history = createBrowserHistory()

function App() {
    // 设置 登录status
    const [status, setStatus] = useState(false)
    // 如果登录状态为真，跳转到 Dashboard 应用
    useEffect(() => {
        console.log(status)
        if (status) {
            history.push("/dashboard")
        }
    }, [status])
    return (
        <Router history={history}>
            {/* 将登录状态和设置登录状态的方法传递到头部组件 */}
            <Header status={status} setStatus={setStatus}/>
            {/* 支持懒加载的 */}
            <Suspense fallback={<Progress/>}>
                <Switch>
                    <Route path="/auth/signin">
                        <AuthApp setStatus={setStatus}/>
                    </Route>
                    <Route path="/dashboard">
                        {!status && <Redirect to="/"/>}
                        <DashboardApp/>
                    </Route>
                    <Route path="/">
                        <MarketingApp/>
                    </Route>
                </Switch>
            </Suspense>
        </Router>
    )
}

export default App
