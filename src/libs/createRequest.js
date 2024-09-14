export default async function createRequest(options) {
  const baseUrl = 'http://localhost:7070'; // TODO: сменить сервер!!!

  const { method, url, body } = options;

  try {
    const response = await fetch(baseUrl + url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    return await response.json(); // response.status = 200 (ok) || 409 (conflict)
  } catch (err) {
    return { error: true, status: 520 };
  }
}
