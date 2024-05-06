import { useEffect, useState } from "react"
import axios from "axios"

export const useSubmissions = () => {
  const [reflections, setReflections] = useState([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    setLoading(true)
    axios
      .get("http://localhost:5151/reflections/search?visibility=true", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setReflections(res.data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }, [])
  return { isLoading, reflections }
}
