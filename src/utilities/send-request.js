import { getToken } from "./users-service";

 async function sendRequest(url, method = "GET", payload = null) {
  // Fetch uses an options object as a second arg to make requests
  // other than basic GET requests, include data, headers, etc.
  const options = { method };
  if (payload) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(payload);
  }
  const token = getToken();
  if (token) {
    // ensure headers object exists
    options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${token}`;
  }

  // const res = await fetch(BASE_URL, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   // Fetch requires data payloads to be stringified
  //   // and assigned to a body property on the options object
  //   body: JSON.stringify(userData),
  // });
  //   Check if request is successful
  const res = await fetch(url, options);
  if (res.ok) return res.json();
  throw new Error("Bad Request");
}


export default sendRequest;