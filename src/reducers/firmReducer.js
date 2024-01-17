const initialState = {
    firmList: [],
    firmListCount: 0,
    firmLogoList: [],
    loading: false, // make sure you have this property
  };
  
  const firmListReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FIRM_LIST':
        return {
          ...state,
          firmList: action.payload,
          loading: false, // set loading to false when the data is loaded
        };
      case 'FIRM_LIST_COUNT':
        return {
          ...state,
          firmListCount: action.payload,
        };
      case 'FIRM_LOGO_LIST':
        return {
          ...state,
          firmLogoList: action.payload,
        };
      case 'LOADING_START':
        return {
          ...state,
          loading: true, // set loading to true when starting to load data
        };
      case 'LOADING_END':
        return {
          ...state,
          loading: false, // set loading to false when finished loading data
        };
      default:
        return state;
    }
  };
  
  export default firmListReducer;
  