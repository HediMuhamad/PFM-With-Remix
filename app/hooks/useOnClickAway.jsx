import { useEffect } from "react"

function useOnClickAway(ref, handler) {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      handler(e)
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClick)
    return () => {
      document.removeEventListener("click", handleClick)
    }
  })
}

export default useOnClickAway
