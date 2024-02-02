export const getNameInitials = (name) => {
  const splitName = name.toUpperCase().split(" ");

  if (splitName > 1) {
    return splitName[0][1] + splitName[1][0];
  }

  return splitName[0][1];
};

export function transformtoArrWithId(snapVal) {
  return snapVal
    ? Object.keys(snapVal).map((roomId) => {
        return { ...snapVal[roomId], id: roomId };
      })
    : [];
}
