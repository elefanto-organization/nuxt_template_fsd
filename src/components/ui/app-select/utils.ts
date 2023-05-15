export const getValueBySelector = <TData, Key extends keyof TData>(
  value: TData,
  selector: Key
): TData[Key] => value[selector];
