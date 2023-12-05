export default function getRandom(list, ignoreList, ignore) {
  let item;
  const validList = list.filter((e) => !ignoreList.includes(e));
  item = validList[Math.floor(Math.random() * validList.length)];
  ignore(item);
  return item;
}
