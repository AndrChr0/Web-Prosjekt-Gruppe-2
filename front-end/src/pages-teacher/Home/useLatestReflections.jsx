import { useEffect, useState } from "react"
import axios from "axios"

export const useLatestReflections = () => {
  const apiURL = import.meta.env.VITE_URL;

  const [reflections, setReflections] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`${apiURL}/reflections/search?visibility=true`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      } )
      .then((res) => {
        // displays the 5 most recent reflections
        const topFiveReflections = res.data.data.reverse().splice(0, 5)
        setReflections(topFiveReflections)
        setIsLoading(false)
        setIsError(false)
      })
      .catch((error) => {
        console.log(error)
        setIsError(error)
        setIsLoading(false)
      })
  }, [])
  return { isLoading, reflections, isError }
}
