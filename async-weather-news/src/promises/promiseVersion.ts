import https from "https";
import { IncomingMessage } from "http";
import { resolve } from "path";
import { rejects } from "assert";

function fetchData(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
        https.get(url, (res: IncomingMessage) => {
            let data = ""

            res.on("data", (chunk) => {
                data += chunk.toString()
            })

            res.on("end", () => {
                try {
                    const json = JSON.parse(data)
                    resolve(json)
                } catch (err) {
                    reject(err instanceof Error ? err : new Error(String(err)))
                }
            })
        }).on("error", (err: Error) => {
            reject(err)
        })
    })
}

export function runPromises() {
    const weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=-26.2&longitude=28.0&current_weather=true"
    const newsUrl = "https://dummyjson.com/posts"

    fetchData(weatherUrl).then((weather) => {
        console.log("Weather :", weather.current_weather)
        return fetchData(newsUrl)
    }).then((news) => {
        console.log("News :", news.posts.slice(0,5))
    }).catch((err) => {
        console.error("Promise Chain Error:", err)
    })

    Promise.all([fetchData(weatherUrl), fetchData(newsUrl)]).then(([weather, news]) => {
        console.log("Weather :", weather.current_weather)
        console.log("News :", news.posts.slice(0,3))
    }).catch((err) => console.error("Promise.all Error:", err))

    Promise.race([fetchData(weatherUrl), fetchData(newsUrl)]).then((fastest) => {
        console.log("\nPromise.race result:", fastest)
    }).catch((err) =>
        console.error("Promise.race Error:", err) 
    )

    Promise.race([fetchData(weatherUrl), fetchData(newsUrl)]).then((fastest) => {
        console.log("Promise.race result:", fastest)
    }).catch((err) => console.error("Promise.race Error:", err))
}