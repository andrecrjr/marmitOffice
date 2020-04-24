export const initialState = {
  geolocation: { changed: false },
  photo: { url_pic: '' },
  isFreela: false,
  firstPart: false,
  pic: {},
};

export const reducerForm = (state, action) => {
  switch (action.type) {
    case 'ADD_GEOLOCATION':
      return { ...state, geolocation: { ...action.payload } };
    case 'UPLOAD_IMAGE':
      return { ...state, photo: { url_pic: action.payload } };
    case 'IS_FREELA':
      return { ...state, isFreela: action.payload };
    case 'FIRST_STEP_CONTROL':
      return { ...state, firstPart: action.payload };
    case 'ADD_PHOTO':
      return { ...state, pic: action.payload };
    default:
      return state;
  }
};
