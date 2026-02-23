# Async Weather & News Dashboard
---
## Overview

This project demonstrates **asynchronous programming in Node.js using TypeScript**. It fetches:

* Weather data from the Open-Meteo API
* News headlines from the DummyJSON API

The same functionality is implemented using three different async styles:

* Callbacks
* Promises
* Async/Await (with try…catch)

It also demonstrates:

* Promise chaining
* Promise.all() (parallel requests)
* Promise.race() (fastest response)
* Error handling
* Event loop concepts

---

## 🛠 Tech Stack

* Node.js
* TypeScript
* https module (no external fetch libraries)
* Open-Meteo API (weather)
* DummyJSON API (news)

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Motikoni012/async-weather-news-dashboard.git
cd async-weather-news-dashboard
```

Install dependencies:

```bash
npm install
```

---

## Running the Application

### Callback Version

Demonstrates callback-based async programming and callback hell.

```bash
npm run callback
```

Sample Output:

```
=== Callback Version ===
Weather: { temperature: 18.3, windspeed: 3.1 }
News: [ { id: 1, title: "..." } ]
Another News Call: { id: 1, title: "..." }
```

---

### Promise Version

Demonstrates promise chaining, Promise.all, and Promise.race.

```bash
npm run promise
```

Sample Output:

```
=== Promise Version ===
Weather: { temperature: 18.3 }
News: [ { id: 1, title: "..." } ]

Promise.all Results:
Weather: ...
News: ...

Promise.race Result:
{ temperature: 18.3 }
```

---

### Async/Await Version

Demonstrates modern async/await with try…catch error handling.

```bash
npm run async
```

Sample Output:

```
=== Async/Await Version ===
Weather: ...
News: ...

Promise.all Results:
Weather: ...
News: ...

Promise.race Result:
...
```

---

## Learning Outcomes

This project demonstrates:

* How the Node.js event loop works
* Differences between callbacks and promises
* How async/await simplifies asynchronous code
* Parallel requests with Promise.all
* Fastest response handling with Promise.race
* Consistent error handling across async styles

---

## Project Structure

```
src/
 ├── callbacks/
 │    └── callbackVersion.ts
 ├── promises/
 │    └── promiseVersion.ts
 ├── asyncAwait/
 │    └── asyncAwaitVersion.ts
 └── utils/
      └── errorHandler.ts
```

---

## Testing

Run all versions to verify functionality:

```bash
npm run callback
npm run promise
npm run async
```
