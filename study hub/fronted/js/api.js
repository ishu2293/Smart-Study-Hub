const BASE_URL = "http://localhost:5000/api";

async function postData(url, data) {
  const res = await fetch(BASE_URL + url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  });
  return res.json();
}