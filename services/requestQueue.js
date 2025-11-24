const queue = [];
let isRunning = false;

// körs automatiskt var sekund
setInterval(processNext, 1000);

function processNext() {
  if (isRunning) return;
  if (queue.length === 0) return;

  const { task, resolve, reject } = queue.shift();
  isRunning = true;

  // kör själva API–anropet
  task()
    .then((result) => {
      resolve(result);
    })
    .catch((error) => {
      reject(error);
    })
    .finally(() => {
      isRunning = false;
    });
}

// Används av meteo.js
export function enqueueRequest(taskFn) {
  return new Promise((resolve, reject) => {
    queue.push({
      task: taskFn,
      resolve,
      reject,
    });
  });
}
