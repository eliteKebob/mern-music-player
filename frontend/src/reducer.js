export const reducer = (state, action) => {
  switch (action.type) {
    case "USER_REGISTER_START":
      return { ...state, userData: "", loading: true, error: "" }
    case "USER_REGISTER_SUCCESS":
      return { ...state, loading: false }
    case "USER_REGISTER_ERROR":
      return { ...state, error: action.payload, loading: false }
    case "USER_LOGIN_START":
      return { ...state, userData: "", loading: true, error: "" }
    case "USER_LOGIN_SUCCESS":
      return {
        ...state,
        userData: action.payload,
        loading: false,
        isLoggedIn: true,
      }
    case "USER_LOGIN_ERROR":
      return { ...state, error: action.payload, loading: false }
    case "USER_LOGOUT":
      return { ...state, userData: "", isLoggedIn: false }
    case "USER_UPDATE_START":
      return { ...state, loading: true }
    case "USER_UPDATE_SUCCESS":
      return {
        ...state,
        userData: action.payload,
        loading: false,
      }
    case "USER_UPDATE_ERROR":
      return { ...state, error: action.payload, loading: false }
    case "MUSIC_ADD_START":
      return { ...state, loading: true }
    case "MUSIC_ADD_SUCCESS":
      return {
        ...state,
        userData: action.payload,
        loading: false,
      }
    case "MUSIC_ADD_ERROR":
      return { ...state, error: action.payload, loading: false }
    case "MUSIC_DELETE_START":
      return { ...state, loading: true }
    case "MUSIC_DELETE_SUCCESS":
      return {
        ...state,
        userData: action.payload,
        loading: false,
      }
    case "MUSIC_DELETE_ERROR":
      return { ...state, error: action.payload, loading: false }
    case "MUSIC_UPDATE_START":
      return { ...state, loading: true }
    case "MUSIC_UPDATE_SUCCESS":
      return {
        ...state,
        loading: false,
      }
    case "MUSIC_UPDATE_ERROR":
      return { ...state, error: action.payload, loading: false }
    case "MUSIC_LIKE_START":
      return { ...state }
    case "MUSIC_LIKE_SUCCESS":
      return {
        ...state,
        userData: action.payload,
        loading: false,
      }
    case "MUSIC_LIKE_ERROR":
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}
