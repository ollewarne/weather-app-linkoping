export function startAutoUpdate(target, methodName, intervalMs = 10000) {
  target[methodName](); 
  // Kör metoden direkt första gången (t.ex. updateWeatherCard())

  const id = setInterval(() => {
    target[methodName]();
  }, intervalMs);
  // Startar en timer som kör samma metod igen var X millisekunder (default 10 sek)

  return id;
  // Returnerar timer-id så man kan stoppa den senare med clearInterval(id)
}
