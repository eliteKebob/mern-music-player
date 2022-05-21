import React from "react"
import axios from "axios"
import { useState, useReducer } from "react"
import { reducer } from "../reducer.js"
import { toast } from "react-toastify"

const AppLevelContext = React.createContext()
const userApi = "/api/users/"
const musicApi = "/api/music/"

const initialState = {
  userData: "",
  loading: false,
  error: "",
  isLoggedIn: false,
}

export const AppLevelProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { userData, loading, error, isLoggedIn } = state
  const [userProfileData, setUserProfileData] = useState("")
  const [userLikedMusics, setUserLikedMusics] = useState("")
  const [userMusics, setUserMusics] = useState("")
  const [queue, setQueue] = useState([])
  const [nowPlaying, setNowPlaying] = useState(0)
  const [musicPause, setMusicPause] = useState(true)
  const [showPlayer, setShowPlayer] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const currentUserLS = JSON.parse(localStorage.getItem("user"))

  window.onbeforeunload = function () {
    localStorage.removeItem("user")
    return ""
  }

  const register = async (formData) => {
    dispatch({ type: "USER_REGISTER_START" })
    try {
      const response = await axios.post(userApi, formData)
      if (response.data) {
        toast.dark("Successfully registered! You can now sign-in.")
        dispatch({ type: "USER_REGISTER_SUCCESS" })
      }
    } catch (error) {
      dispatch({ type: "USER_REGISTER_ERROR" })
      toast.dark("There was an error. Try again later.")
    }
  }

  const login = async (formData) => {
    dispatch({ type: "USER_LOGIN_START" })
    try {
      const response = await axios.post(userApi + "login", formData)
      if (response.data) {
        toast.dark("Successfully signed in!")
        dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data })
        localStorage.setItem("user", JSON.stringify(response.data))
      }
    } catch (error) {
      dispatch({ type: "USER_LOGIN_ERROR" })
      toast.dark("There was an error. Try again later.")
    }
  }

  const logout = () => {
    toast.dark("Successfully logged out!")
    dispatch({ type: "USER_LOGOUT" })
    localStorage.removeItem("user")
  }

  const getUser = async (id) => {
    try {
      const response = await axios.get(userApi + id)
      if (response.data) {
        setUserProfileData(response.data)
      }
    } catch (error) {
      toast.dark("There was an error. Try again later.")
    }
  }

  const updateUser = async (id, updateData) => {
    dispatch({ type: "USER_UPDATE_START" })
    try {
      let token = currentUserLS?.token
      let config = {
        method: "put",
        url: `/api/users/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: updateData,
      }
      const response = await axios(config)
      if (response.data) {
        dispatch({ type: "USER_UPDATE_SUCCESS", payload: response.data })
        toast.dark("Successfully updated your profile!")
      }
    } catch (error) {
      dispatch({ type: "USER_UPDATE_ERROR" })
      toast.dark("There was an error. Try again later.")
    }
  }

  const addMusic = async (musicData) => {
    dispatch({ type: "MUSIC_ADD_START" })
    try {
      let token = currentUserLS?.token
      let config = {
        method: "post",
        url: musicApi,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: musicData,
      }
      const response = await axios(config)
      if (response.data) {
        dispatch({ type: "MUSIC_ADD_SUCCESS", payload: response.data })
        setUserProfileData(response.data)
        toast.dark("Track successfully uploaded!")
      }
    } catch (error) {
      dispatch({ type: "MUSIC_ADD_ERROR" })
      toast.dark("There was an error. Try again later.")
    }
  }

  const getUserMusics = async (id) => {
    try {
      const response = await axios.get(userApi + id + "/addedmusics")
      if (response.data) {
        setUserMusics(response.data)
      }
    } catch (error) {
      toast.dark("There was an error. Try again later.")
    }
  }

  const getUserLikedMusics = async (id) => {
    try {
      const response = await axios.get(userApi + id + "/likedmusics")
      if (response.data) {
        setUserLikedMusics(response.data)
      }
    } catch (error) {
      toast.dark("There was an error. Try again later.")
    }
  }

  const addMusicToQ = (t) => {
    let newQ = queue
    newQ.push(t)
    toast.dark("Track successfully added to the queue!")
    setQueue(newQ)
  }

  const deleteMusic = async (id) => {
    dispatch({ type: "MUSIC_DELETE_START" })
    try {
      let token = currentUserLS?.token
      let config = {
        method: "delete",
        url: musicApi + id,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await axios(config)
      if (response.data) {
        dispatch({ type: "MUSIC_DELETE_SUCCESS", payload: response.data })
        setUserProfileData(response.data)
        toast.dark("Track successfully deleted!")
      }
    } catch (error) {
      dispatch({ type: "MUSIC_DELETE_ERROR" })
      toast.dark("There was an error. Try again later.")
    }
  }

  const updateMusic = async (id, updateData) => {
    dispatch({ type: "MUSIC_UPDATE_START" })
    try {
      let token = currentUserLS?.token
      let config = {
        method: "put",
        url: musicApi + id,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: updateData,
      }
      const response = await axios(config)
      if (response.data) {
        dispatch({ type: "MUSIC_UPDATE_SUCCESS" })
        toast.dark("Track successfully updated!")
      }
    } catch (error) {
      dispatch({ type: "MUSIC_UPDATE_ERROR" })
      toast.dark("There was an error. Try again later.")
    }
  }

  const likeMusic = async (id) => {
    dispatch({ type: "MUSIC_LIKE_START" })
    try {
      let token = currentUserLS?.token
      let config = {
        method: "put",
        url: musicApi + id + "/like",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await axios(config)
      if (response.data) {
        dispatch({ type: "MUSIC_LIKE_SUCCESS", payload: response.data })
        toast.dark("You liked this track!")
      }
    } catch (error) {
      dispatch({ type: "MUSIC_LIKE_ERROR" })
      toast.dark("There was an error. Try again later.")
    }
  }

  const unlikeMusic = async (id) => {
    dispatch({ type: "MUSIC_LIKE_START" })
    try {
      let token = currentUserLS?.token
      let config = {
        method: "put",
        url: musicApi + id + "/unlike",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await axios(config)
      if (response.data) {
        dispatch({ type: "MUSIC_LIKE_SUCCESS", payload: response.data })
        toast.dark("You unliked this track!")
      }
    } catch (error) {
      dispatch({ type: "MUSIC_LIKE_ERROR" })
      toast.dark("There was an error. Try again later.")
    }
  }

  return (
    <AppLevelContext.Provider
      value={{
        register,
        login,
        isLoggedIn,
        userData,
        loading,
        error,
        logout,
        getUser,
        userProfileData,
        updateUser,
        addMusic,
        getUserMusics,
        userMusics,
        userLikedMusics,
        getUserLikedMusics,
        addMusicToQ,
        queue,
        setQueue,
        nowPlaying,
        setNowPlaying,
        musicPause,
        setMusicPause,
        deleteMusic,
        updateMusic,
        showPlayer,
        setShowPlayer,
        likeMusic,
        unlikeMusic,
        showForm,
        setShowForm,
      }}
    >
      {children}
    </AppLevelContext.Provider>
  )
}
export default AppLevelContext
