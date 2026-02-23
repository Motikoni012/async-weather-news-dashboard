import { fetchData } from "../services/apiServices";
import { handleError } from "../utils/errorHandler";

export function runCallbacks(): void {
    console.log("\n=== Callback Version ===")

    const weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=-26.2&longitude=28.0&current_weather=true"
    const newsUrl = "https://dummyjson.com/posts"

    fetchData(weatherUrl)
        .then((weather) => {
            console.log("Weather:", weather.current_weather)

            fetchData(newsUrl)
                .then((news) => {
                    console.log("News:", news.posts.slice(0, 5))
                    fetchData(newsUrl).then((secondNews) => {
                        console.log(
                            "Another News Call:",
                            secondNews.posts[0]
                        )
                    })
                })
                .catch((err) => handleError("Callback News", err))
        })
        .catch((err) => handleError("Callback Weather", err))
}

runCallbacks();