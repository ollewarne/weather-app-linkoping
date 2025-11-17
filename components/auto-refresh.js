export function startAutoUpdate(target, methodName, intervalMs = 10000) {
  target[methodName](); 

  const id = setInterval(() => {
    target[methodName]();
  }, intervalMs);

  return id;
}
