async function getPreviews(id: string = "") {
  const url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL + `/contracts/preview/${id}`;
  let data = await fetch(url);
  let result = await data.json();
  const contract: any = result.data;

  return result;
}

export { getPreviews };
