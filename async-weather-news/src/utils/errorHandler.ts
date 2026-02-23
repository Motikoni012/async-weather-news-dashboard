export function handleError(context: string, err: unknown): void {
    console.error(`\nERROR in [${context}]`)
    console.error("FULL ERROR OBJECT:", err)
}