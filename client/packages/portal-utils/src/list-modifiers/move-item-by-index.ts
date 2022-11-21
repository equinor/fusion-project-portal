export function moveItemToTopByIndex<TData>(
  currentList: TData[],
  index: number
): TData[] {
  if (currentList.length <= index) throw new Error('Index out of scope');
  const list = [...currentList];

  list.unshift(list.splice(index, 1)[0]);
  return list;
}
