export const objectContainsNoOtherKeys = (obj: object, keys: any) => {
  return Object.keys(obj).every((key) => keys.includes(key));
};
