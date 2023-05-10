export const updateStore = (actionType, data) => {
  return {
    type: actionType,
    payload: data,
  }
}
