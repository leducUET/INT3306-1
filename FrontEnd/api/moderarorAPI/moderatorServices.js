import axiosClient from "../axiosClient";
const MODERATORS_URL = "moderators";

export const getAllMorderator = () => {
  return axiosClient.get(MODERATORS_URL);
};

export const addModerator = (newModerator) => {
  return axiosClient.post(MODERATORS_URL, newModerator);
};

export const updateModerator = (updatedModerator, id) => {
  return axiosClient.patch(`${MODERATORS_URL}/${id}`, updatedModerator);
};

export const deleteModerator = (id) => {
  return axiosClient.delete(`${MODERATORS_URL}/${id}`);
};
