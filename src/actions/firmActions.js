import axios from 'axios'

import {FIRM_LIST, LOADING_END, LOADING_START, FIRM_LOGO_LIST, FIRM_LIST_COUNT} from '../types'

export const firmListCount = () => async dispatch => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/get_main_companies`)
    dispatch( {
        type: FIRM_LIST_COUNT,
        payload: res.data.original.length
    })
}

export const firmAddApi = (inputFirmName, inputFirmShortName, inputFirmType) => async dispatch => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/companies`,
    {
        company_title: inputFirmName,
        short_name: inputFirmShortName,
        firm_type_id: inputFirmType,
        parent_company_id: 0
    })
    dispatch( {
        type: FIRM_LIST,
        payload: res.data
    })
}

export const firmUpdateApi = (inputFirmName, inputFirmShortName, inputFirmType, selectedRow) => async dispatch => {
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/companies/${selectedRow}`,
    {
        company_title: inputFirmName,
        short_name: inputFirmShortName,
        firm_type_id: inputFirmType,
    })
    dispatch( {
        type: FIRM_LIST,
        payload: res.data
    })
}

export const firmDeleteApi = (selectedRow) => async dispatch => {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/companies/${selectedRow}`)
    dispatch( {
        type: FIRM_LIST,
        payload: res.data
    })
}

export const firmSearchApi = (search, rowsPerPage, page) => async dispatch => {
    dispatch({ type: LOADING_START });
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/companies?per_page=${rowsPerPage}&search=${search}&page=${page + 1}&parent_company_id=0`);
      dispatch({
        type: FIRM_LIST,
        payload: res.data.original.data,
      });
    } catch (error) {
      // handle error if needed
    } finally {
      dispatch({ type: LOADING_END });
    }
  };

export const firmLogoUpload = (file) => async dispatch => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await axios.post(`${import.meta.env.VITE_API_URL}/upload-files`,
    formData, 
    {
        headers: {
          "Content-Type": "multipart/form-data",
        },
    })
    dispatch( {
        type: FIRM_LIST,
        payload: res.data.original.data
    })
}

export const firmLogoUpdate = (file) => async dispatch => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('file_id', );

    const res = await axios.post(`${import.meta.env.VITE_API_URL}/update-file`,
    formData, 
    {
        headers: {
          "Content-Type": "multipart/form-data",
        },
    })
    dispatch( {
        type: FIRM_LIST,
        payload: res.data.original.data
    })
}

export const firmLogoListApi = () => async dispatch => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/logos`)
    dispatch( {
        type: FIRM_LOGO_LIST,
        payload: res.data.original.length
    })
}