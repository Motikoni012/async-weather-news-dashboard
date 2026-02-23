import https from "https";
import { IncomingMessage } from "http";
import { handleError } from "../utils/errorHandler";

function fetchData(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res: IncomingMessage) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk.toString();
        });

        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            resolve(json);
          } catch (err) {
            reject(err instanceof Error ? err : new Error(String(err)));
          }
        });
      })
      .on("error", (err: Error) => reject(err));
  });
}

export function runPromises() {
  console.log("\n=== Promise Version ===");

  const weatherUrl =
    "https://api.open-meteo.com/v1/forecast?latitude=-26.2&longitude=28.0&current_weather=true";
  const newsUrl = "https://dummyjson.com/posts";

  fetchData(weatherUrl)
    .then((weather) => {
      console.log("Weather:", weather.current_weather);
      return fetchData(newsUrl);
    })
    .then((news) => {
      console.log("News:", news.posts.slice(0, 5));
    })
    .catch((err) => handleError("Promise Chain", err));

  Promise.all([fetchData(weatherUrl), fetchData(newsUrl)])
    .then(([weather, news]) => {
      console.log("\nPromise.all Results:");
      console.log("Weather:", weather.current_weather);
      console.log("News:", news.posts.slice(0, 3));
    })
    .catch((err) => handleError("Promise.all", err));

  Promise.race([fetchData(weatherUrl), fetchData(newsUrl)])
    .then((fastest) => {
      console.log("\nPromise.race Result:", fastest);
    })
    .catch((err) => handleError("Promise.race", err));
}