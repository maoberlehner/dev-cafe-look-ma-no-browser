export type Product = {
  id: number,
  name: string,
  price: number,
}

const ENDPOINT = `/api/products`;

export async function getList(): Promise<Product[]> {
  return (await fetch(ENDPOINT).then(response => response.json())).data;
}
