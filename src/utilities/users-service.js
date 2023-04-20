// Serice modules hold the code that implements
// "business"/application logic
// Service methods often depend upon or use
// methods in the API modules

import * as usersApi from "./users-api";

export async function signUp(userData) {
  const token = await usersApi.signUp(userData);
  localStorage.setItem('token',token)
  return getUser();
}

export function getToken() {
  // getItem returns null if there's no string
  const token = localStorage.getItem("token");
  if (!token) return null;
  // obtain the payload
  const payload = JSON.parse(atob(token.split(".")[1]));
  // JWT exp is express in secs
  if (payload.exp < Date.now() / 1000) {
    // token has expired = remove it
    localStorage.removeItem("Item");
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  // If there is a token, return the user in the payload, otherwise return null
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

export function logOut(){
    localStorage.removeItem('token');
}


export async function login(credentials){
  // delegate ajax request to backend= users-api.js
  const token = await usersApi.login(credentials);
  localStorage.setItem('token',token)
  return getUser()

}

export async function checkToken(){
  const dateStr = await usersApi.checkToken()
  return new Date(dateStr)   
}