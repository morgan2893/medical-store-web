export function removeKeysFromArray(arr: any, keysToRemove: any) {
  return arr.map((obj: any) =>
    Object.fromEntries(
      Object.entries(obj).filter(([key]) => !keysToRemove.includes(key))
    )
  );
}
