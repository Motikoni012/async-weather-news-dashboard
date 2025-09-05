# async-weather-news-dashboard

This project demonstrates **asynchronous programming in Node.js + TypeScript** using three approaches:  
**Callbacks, Promises, and Async/Await**.  

It fetches:
- **Weather Data** (Open-Meteo API)
- **News Headlines** (DummyJSON API)

# Features
- **Callback-based implementation** (classic style, shows "callback hell")
- **Promise-based implementation** (chaining, `.then/.catch`)
- **Async/Await implementation** (cleaner syntax with `try...catch`)
- **Promise.all()** → fetch weather + news simultaneously
- **Promise.race()** → return whichever finishes first
- **Consistent error handling** across all versions

# Project Structure
src/
  - callbacks/
    - callbackVersion.ts
  - promises/
  - promiseVersion.ts
  - asyncAwait/
  - asyncAwaitVersion.ts
- utils/
- errorHandler.ts


# Installation & Setup

- Clone the repo
git clone https://github.com/<your-username>/async-weather-news-dashboard.git
cd async-weather-news-dashboard

- Install dependencies
npm install

- Run in dev mode (index.ts)
npm run dev

- Callback Version
npm run callback
```
Weather: { temperature: 15.3, windspeed: 2.9, ... }
News: [ { id: 1, title: "..." }, { id: 2, title: "..." } ]
Another News Call: { id: 1, title: "..." }
```

- Promise Version
npm run promise
```
Weather : { temperature: 15.2, ... }
News : [ { id: 1, title: "..." }, { id: 2, title: "..." } ]

Weather: { temperature: 15.2, ... }
News: [ { id: 1, ... }, { id: 2, ... } ]

Promise.race result:
{ temperature: 15.2, ... }
```

- Async/Await Version
  npm run async
```
Weather : { temperature: 15.4, windspeed: 3.2, ... }
News : [ { id: 1, title: "..." }, { id: 2, title: "..." } ]

Weather: { temperature: 15.4, ... }
News: [ { id: 1, ... }, { id: 2, ... } ]

Promise.race (Async/Await):
{ temperature: 15.4, ... }
