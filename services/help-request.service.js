import axios from "axios";
import { SERVER_ROOT } from "react-native-dotenv";
import statusCodes from "../constants/statusCodes";
import * as TokenService from "../services/token.service";

const sendHelpRequest = async (userId, token) => {
  return axios
    .post(SERVER_ROOT + "/help-requests", { userId }, TokenService.getHeader(token))
    .then(response => {
      return response;
    })
    .catch(err => console.error(err));
};

const addResponderToHelpRequest = (userId, token, helpRequestId) => {
  return axios
    .put(
      `${SERVER_ROOT}/help-requests/${helpRequestId}`,
      {
        newResponderId: userId,
        status: "taken"
      },
      TokenService.getHeader(token)
    )
    .then(response => {
      return response;
    })
    .catch(err => {
      if (err.response) {
        if (
          err.response.status == statusCodes.badRequest &&
          err.response.data.statusCode == statusCodes.limitReachedError
        ) {
          return err.response;
        }
      } else {
        console.error(err);
      }
    });
};

const updateStatusOfHelpRequest = (token, newStatus, helpRequestId) => {
  return axios
    .put(
      `${SERVER_ROOT}/help-requests/${helpRequestId}`,
      {
        status: newStatus
      },
      TokenService.getHeader(token)
    )
    .then(response => {
      return response;
    })
    .catch(err => console.error(err));
};

module.exports = {
  sendHelpRequest,
  addResponderToHelpRequest,
  updateStatusOfHelpRequest
};
