import React from 'react'
import {checkToken} from '../../utilities/users-service' 

const OrderHistory = () => {

async function handleCheckToken(){
  const expDate = await checkToken();
  console.log(expDate);
}

  return (
    <div>

        <h1>Order History Page </h1>
        <button onClick={handleCheckToken}>Check when my content expires</button>
    </div>
  )
}

export default OrderHistory