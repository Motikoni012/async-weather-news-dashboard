export async function fetchData(url: string): Promise<any> {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)

    try {
        const response = await fetch(url, {
            signal: controller.signal
        })

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        if (error instanceof Error) {
            throw error
        }
        throw new Error("Unknown network error")
    } finally {
        clearTimeout(timeout)
    }
}