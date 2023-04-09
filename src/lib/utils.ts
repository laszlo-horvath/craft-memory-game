export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const json = await res.json();
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number;
      };
      error.status = res.status;
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }

  return res.json();
}

export const shuffle = (array: any[]) => {
  let currentIndex = array.length
  let randomIndex;

  while (currentIndex !== 0) {
    // Pick random element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap with current element
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}
