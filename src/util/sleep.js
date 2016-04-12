// sleep returns a promise that resolves in <time> milliseconds
// useful for timeouts/delays in generators
export async function sleep (time) {
    await new Promise((resolve) => setTimeout(resolve, time))
}
