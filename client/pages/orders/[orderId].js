import Router from 'next/router'
import useRequest from '../../hooks/use-request'
import { useEffect, useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'
const OrderShow = ({ order, currentUser }) => {

    const [timeLeft, setTimeLeft] = useState('')
    const {doRequest, errors} = useRequest({
        url:'/api/payments',
        method:'post',
        body:{
            orderId:order.id
        },
        onSuccess:(payment)=>Router.push('/orders')
    }) 

    useEffect(() => {

        const findTimeLeft = () => {  
              const msLeft = new Date(order.expiresAt) - new Date();

            setTimeLeft(Math.round(msLeft/1000))
        }

    findTimeLeft();
      const timerId=  setInterval(findTimeLeft,1000)


      return()=>{
          clearInterval(timerId)
      }
    }, [order])


    if(timeLeft <0){
         return <div>Order Expired</div>
    }
    return <div>
        Time left to pay : {timeLeft} seconds
         <StripeCheckout 
          token={(token)=>doRequest({token:token.id})}
          stripeKey="pk_test_51I8YkLBH3BmD4OJRW1xqd5SBsxkzIK6zce35fNOUxqKfXcd7Fdnq3Tci2sf10Woep9QmspupabHThPpCwbZvGiBs00PFiyJgEI"
          amount={order.ticket.price * 1000}
          email={currentUser.email}
         />
         {errors}
        </div>
}

OrderShow.getInitialProps = async (context, client) => {
    const { orderId } = context.query;
    const { data } = await client.get(`/api/orders/${orderId}`)


    return { order: data }
}

export default OrderShow