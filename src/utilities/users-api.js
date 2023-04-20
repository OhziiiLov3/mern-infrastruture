// This is the base path of the Express route we'll define
import sendRequest from './send-request'
const BASE_URL = '/api/users';



export function signUp(userData){
  return sendRequest(BASE_URL, 'POST', userData)
}



export function login(credentials){
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials)
}



export function checkToken(){
  return sendRequest(`${BASE_URL}/check-token`)
}





// export async function login(credentials){
//   // Fetch uses an option object as a second arg to make req other than GET/send 
//   const res = await fetch(`${BASE_URL}/login`,{
//     method: 'POST',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify(credentials)
//   });
//   if(res.ok){
//     // Promise to resolve JWT
//     return res.json();
//   }else{
//     throw new Error('invalid')
//   }
// }