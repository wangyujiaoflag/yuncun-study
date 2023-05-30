export function urlJointQuery(url: string, query: any) {
  const queryArr = [];
  // 如果query是一个空对象则直接返回url
  if (!Object.keys(query).length) return url;
  // 不是空对象则拼接到url后面
  for (const key in query) {
    queryArr.push(`${key}=${query[key]}`);
  }
  return `${url}?${queryArr.join("")}`;
}
