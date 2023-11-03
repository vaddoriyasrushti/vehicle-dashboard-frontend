import { apiUrl } from "../baseUrl";
import axios from "axios";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  vehicleList: [],
  loading: false,
};

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setVehicleList: (state, action) => {
      state.vehicleList = action.payload;
    },

    addNewVehicle: (state, action) => {
      state.vehicleList = state.vehicleList.concat(action.payload)
    },

    editNewVehicle: (state, action) => {
      const index = state.vehicleList.findIndex(data => data.no === action.payload.no);
      state.vehicleList[index] = action.payload
    },

    deleteVehicle: (state, action) => {
      const index = state.vehicleList.findIndex(data => data.no === action.payload);
      state.vehicleList.splice(index, 1);
    }

  },
});

export const { setLoading, setVehicleList, addNewVehicle, editNewVehicle, deleteVehicle } = vehicleSlice.actions;
export default vehicleSlice.reducer;

const headers = {
  'Access-Control-Allow-Origin' : '*',
  'Access-Control-Allow-Headers' :'Content-Type',
  'Access-Control-Allow-Methods' :'GET, POST, PUT, DELETE',
  'Accept': 'application/json',
  'Content-Type': 'application/json'

}
export const getVehicleList =
  () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      await axios
        .get(apiUrl.GET_VEHICLE, {         
               headers})
        .then((response) => {
          if (response.status === 200) {
            dispatch(setVehicleList(response.data || []));
            dispatch(setLoading(false));
          } else {
            dispatch(setLoading(false));
          }
        })
        .catch((e) => {
          dispatch(setLoading(false));
        });
    } catch (error) {
      dispatch(setLoading(false));
    }
  };

  export const getVehicleByNo =
  (vehicleNo) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      await axios
        .get(`${apiUrl.GET_VEHICLE}/${vehicleNo}`,{         
          headers}
        )
        .then((response) => {
          if (response.status === 200) {
            dispatch(editNewVehicle(response.data?.[0] || []));
            dispatch(setLoading(false));
          } else {
            dispatch(setLoading(false));
          }
        })
        .catch((e) => {
          dispatch(setLoading(false));
        });
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
  
  export const addVehicle =
    (values, onSuccess, onFailure) => async (dispatch) => {
      dispatch(setLoading(true));
      try {
        await axios
          .post(apiUrl.ADD_VEHICLE, values, {         
            headers})
          .then((response) => {
            if (response.status === 200) {
              onSuccess(response);
              response?.data && 
              dispatch(addNewVehicle(response.data));
              dispatch(setLoading(false));
            } else {
              onFailure(response);
              dispatch(setLoading(false));
            }
          })
          .catch((e) => {
            onFailure(e);
            dispatch(setLoading(false));
          });
      } catch (error) {
        dispatch(setLoading(false));
      }
   };
  
  export const editVehicleByNo =
  (no,values, onSuccess, onFailure) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      await axios
        .put(`${apiUrl.GET_VEHICLE}/${no}`, values, {         
          headers})
        .then((response) => {
          if (response.status === 200) {
            onSuccess(response);
            dispatch(getVehicleByNo(no));
            dispatch(setLoading(false));
          } else {
            onFailure(response);
            dispatch(setLoading(false));
          }
        })
        .catch((e) => {
          onFailure(e);
          dispatch(setLoading(false));
        });
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
  
  export const deleteVehicleByNo =
  (vehicleNo, onSuccess, onFailure) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      await axios
        .delete(`${apiUrl.DELETE_VEHICLE_BY_NO}/${vehicleNo}`, {         
          headers})
        .then((response) => {
          if (response.status === 200) {
            onSuccess(response);
            
            dispatch(deleteVehicle(vehicleNo));
            dispatch(setLoading(false));
          } else {
            onFailure(response);
            dispatch(setLoading(false));
          }
        })
        .catch((e) => {
          onFailure(e);
          dispatch(setLoading(false));
        });
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
  