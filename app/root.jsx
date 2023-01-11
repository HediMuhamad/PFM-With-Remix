import {
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"

import rootStyles from "~/styles/root.css"
import { AppLogo } from "./shared/assets"

/**
 * @returns {import("@remix-run/node").LinkDescriptor[]}
 */
export const links = () => [
  {
    rel: "stylesheet",
    href: rootStyles,
  },
]

/**
 * @returns {import("@remix-run/node").MetaFunction}
 */
export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
})

function AppContainer() {
  return (
    <div className="app-container">
      <nav className="slidebar">
        <NavLink to={"/"}>
          <AppLogo />
        </NavLink>
        <NavLink className={"navlink"} to={"/"}>
          Overview
        </NavLink>
        <NavLink className={"navlink"} to={"/transactions"}>
          Transaction History
        </NavLink>
      </nav>
      <div className="topbar"></div>
      <main className="main">
        <Outlet />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <AppContainer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
