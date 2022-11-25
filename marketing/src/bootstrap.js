import React from "react"
import ReactDOM from "react-dom"
import {createMemoryHistory, createBrowserHistory} from "history"
import App from "./App"

function mount(el, {onNavgate, defaultHistory, initialPath}) {
    const history =
        defaultHistory ||
        createMemoryHistory({
            initialEntries: [initialPath]
        })
    // 监听容器传来的方法
    if (onNavgate) history.listen(onNavgate)
    ReactDOM.render(<App history={history}/>, el)
    return {
        // 当容器应用路由发生变化时需要通知微应用路由进行响应 (微应用向容器应用传递方法)
        onParentNavigate({pathname: nextPathname}) {
            const pathname = history.location.pathname
            if (nextPathname !== pathname) {
                history.push(nextPathname)
            }
        }
    }
}

if (process.env.NODE_ENV === "development") {
    const el = document.querySelector("#dev-marketing")
    if (el)
        mount(el, {
            defaultHistory: createBrowserHistory()
        })
}

export {mount}
