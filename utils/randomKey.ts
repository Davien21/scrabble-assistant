import crypto from "crypto";

const getRandomKey = (length: number = 7) => {
  return crypto.randomBytes(length).toString("hex");
};

const addIds = (data: any[]) => {
  return data.map((item) => {
    item._id = getRandomKey();
    return item;
  });
};

export { getRandomKey, addIds };
