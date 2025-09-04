import https from "https";
import { IncomingMessage } from "http";
import { resolve } from "path";
import { rejects } from "assert";
import { console } from "inspector";

function fetchData(url: string): Promise<any> {
    return new Promise((resolve, rejects) => {
        https.get(url, (res: IncomingMessage) => {
            let data = ""

            res.on("data", (chunk) => {
                data += chunk
            })

            res.on("end", () => {
                try{
                    const json = JSON.parse(data)
                    resolve(json)
                } catch (err) {
                    rejects(err instanceof Error ? err: new Error(String(err)))
                }
            })
        }).on("error", (err: Error) => {
            rejects(err)
        })
    })
}

export async function runAsyncAwait() {
    const weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=-26.2&longitude=28.0&current_weather=true"
    const newsUrl = "https://dummyjson.com/posts"

    try{
        const weather = await fetchData(weatherUrl)
        console.log("Weather :", weather.current_weather)

        const news = await fetchData(newsUrl)
        console.log("News :", news.posts.slice(0,5))
    } catch (err) {
        console.error("Asnc/Await Error:", err)
    }

    try {
        const [weather, news] = await Promise.all([
            fetchData(weatherUrl), fetchData(newsUrl)
        ])

        console.log("Weather :", weather.current_weather)
        console.log("News :", news.posts.slice(0,3))
    } catch (err) {
        console.error("Pormise.all Error:", err)
    }

    try {
        const fastest = await Promise.race([
            fetchData(weatherUrl),
            fetchData(newsUrl)
        ])
        console.log("\nPromise.race (Aync?Await):", fastest)
    } catch (err) {
        console.error("Promise.race Error:", err)
    }
}