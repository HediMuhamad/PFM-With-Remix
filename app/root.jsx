import {
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react"

import rootStyles from "~/styles/root.css"
import { AppLogo } from "~/shared/svgrc"
import { useMemo } from "react"

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
  let path = useLocation().pathname.split("/")[1]
  path = "/" + path

  const pageDetails = {
    "/": {
      title: "overview",
    },
    "/transactions": {
      title: "transaction history",
    },
  }

  const navlinksClassName = useMemo(() => "slidebar__navlink", [])

  return (
    <>
      <nav className="slidebar">
        <NavLink className={navlinksClassName + "--logo-yes"} to={"/"}>
          <AppLogo />
        </NavLink>
        <NavLink className={navlinksClassName} to={"/"}>
          {pageDetails["/"].title}
        </NavLink>
        <NavLink className={navlinksClassName} to={"/transactions"}>
          {pageDetails["/transactions"].title}
        </NavLink>
      </nav>
      <div className="topbar">
        <span className="topbar__headline">{pageDetails[path].title}</span>
      </div>
      <main className="main">
        <Outlet />
      </main>
    </>
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
