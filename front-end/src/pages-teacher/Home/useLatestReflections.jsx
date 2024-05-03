import { useEffect, useState } from "react"
import axios from "axios"

export const useLatestReflections = () => {
  const [reflections, setReflections] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios
      .get("http://localhost:5151/reflections")
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
