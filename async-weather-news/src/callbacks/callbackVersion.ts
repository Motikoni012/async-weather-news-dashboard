import https from "https";
import { IncomingMessage } from "http";

function fetchData(url: string, callback: (err: Error | null, data?: any) => void) {
    https.get(url, (res: IncomingMessage) => {
        let data = ""

        res.on("data", (chunk) => {
            data += chunk
        })

        res.on("end", () => {
            try {
                const json = JSON.parse(data)
                callback(null, json)
            } catch (err) {
                callback(err as Error)
            }
        })
    }).on("error", (err: Error) => {
        callback(err)
    })
}

export function runCallbacks() {
    const weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=-26.2&longitude=28.0&current_weather=true"
    const newsUrl = "https://dummyjson.com/posts"

    fetchData(weatherUrl, (err, weatherData) => {
        if(err) {
            return console.error("Weather fetch error:", err.message)
        }

        console.log("Weather:", weatherData.current_weather)

        fetchData(newsUrl, (err, newsData) => {
            if(err) {
                return console.error("News fetch error:", err.message)
            }
            console.log("News:", newsData.posts.slice(0,5))

            fetchData(newsUrl, (err, secondNews) => {
                if(err) {
                    return console.error("Second news fetch error:", err.message)
                }
                console.log("Another News Call:", secondNews.posts[0])
            })
        })
    })
}