export function moveItemToTopByIndex<TData>(
  currentList: TData[],
  index: number
): TData[] {
  const list = [...currentList];

  list.unshift(list.splice(index, 1)[0]);
  return list;
}
