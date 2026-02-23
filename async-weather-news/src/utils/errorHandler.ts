export function handleError(context: string, err: unknown) {
  if (err instanceof Error) {
    console.error(`ERROR! [${context}] ${err.message}`);
  } else {
    console.error(`ERROR! [${context}] Unknown error:`, err);
  }
}