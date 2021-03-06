import * as axios from "axios";
import { SERVER_ROOT } from "react-native-dotenv";
import { SET_MY_RESPONDERS, RESPONDERS_ERROR } from "./Types";
import { Actions } from "react-native-router-flux";
import * as TokenService from "../../services/token.service";

export const respondersError = error => {
  Actions.alert({
    alertTitle: "Responders request failed!",
    alertBody: error.response?.data?.errors[0]?.message || "",
    positiveButton: { text: "OK" }
  });
  return {
    type: RESPONDERS_ERROR,
    data: {
      error: error
    }
  };
};

const setMyResponders = myResponders => {
  return {
    type: SET_MY_RESPONDERS,
    data: {
      myResponders
    }
  };
};

export const getMyResponders = (userId, token) => {
  return dispatch => {
    axios
      .get(`${SERVER_ROOT}/users/${userId}/responders`, TokenService.getHeader(token))
      .then(response => {
        dispatch(setMyResponders(response.data.responders));
      })
      .catch(error => {
        dispatch(respondersError(error));
      });
  };
};

export const addResponders = (userId, token, respondersToAdd, myResponders) => {
  return dispatch => {
    axios
      .post(
        `${SERVER_ROOT}/users/${userId}/responders`,
        { respondersToAdd },
        TokenService.getHeader(token)
      )
      .then(response => {
        const newMyResponders = [...myResponders, ...response.data.respondersAdded];
        dispatch(setMyResponders(newMyResponders));
        Actions.pop();
      })
      .catch(error => {
        dispatch(respondersError(error));
      });
  };
};

export const removeResponders = (userId, token, respondersToDelete, myResponders) => {
  return dispatch => {
    let headers = TokenService.getHeader(token).headers;
    axios
      .request({
        method: "delete",
        url: `${SERVER_ROOT}/users/${userId}/responders`,
        headers,
        data: { respondersToDelete }
      })
      .then(response => {
        let removedUserIds = [];
        for (responder of response.data.respondersDeleted) {
          removedUserIds.push(responder.id);
        }
        let newMyResponders = [];
        for (responder of myResponders) {
          if (!removedUserIds.includes(responder.id)) {
            newMyResponders.push(responder);
          }
        }
        dispatch(setMyResponders(newMyResponders));
        Actions.pop();
      })
      .catch(error => {
        dispatch(respondersError(error));
      });
  };
};

export const set_is_my_responder_loading = isRespondersLoading => {
  return {
    type: SET_IS_MY_RESPONDERS_LOADING,
    data: { isRespondersLoading: isRespondersLoading }
  };
};
