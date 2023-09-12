import { useState, useEffect, useCallback } from "react"

export function useLocalStorage(key, defaultValue) {
  return useStorage(key, defaultValue, typeof window !== "undefined" ? window.localStorage : null)
}

export function useSessionStorage(key, defaultValue) {
  return useStorage(key, defaultValue, typeof window !== "undefined" ? window.sessionStorage : null)
}

function useStorage(key, defaultValue, storageObject) {
  const [value, setValue] = useState(() => {
    let storedValue = defaultValue;
    try {
      if (storageObject) {
        const jsonValue = storageObject.getItem(key)
        if (jsonValue != null) return JSON.parse(jsonValue)
      }
    } catch (error) {
      console.error("Error retrieving stored value:", error)
    }

    if (typeof defaultValue === "function") {
      storedValue = defaultValue()
    } else {
      storedValue = defaultValue
    }
    
    return storedValue;
  })

  useEffect(() => {
    try {
      if (storageObject) {
        if (value === undefined) {
          storageObject.removeItem(key)
        } else {
          storageObject.setItem(key, JSON.stringify(value))
        }
      }
    } catch (error) {
      console.error("Error storing value:", error)
    }
  }, [key, value, storageObject])

  const remove = useCallback(() => {
    setValue(undefined)
  }, [])

  return [value, setValue, remove]
}
