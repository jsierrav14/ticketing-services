import React, { useState } from 'react'
import useRequest from '../../hooks/use-request'
import Router from 'next/router'
const NewTitcket = () => {

    const [title, settitle] = useState("")
    const [price, setprice] = useState()
    const { doRequest, errors } = useRequest({
        url: '/api/tickets',
        method: 'post',
        body: {
            title,
            price
        },
        onSuccess: () => Router.push('/')
    })

    const onBlur = () => {

        const value = parseFloat(price)

        if (isNaN(value)) {
            return;
        }

        setprice(value.toFixed(2))
    }

    const onSubmit = (event) => {
        event.preventDefault();
        doRequest()
    }
    return (
        <div>
            <h1>Create a ticket</h1>

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input className="form-control" value={title} onChange={(e) => settitle(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Price</label>
                    <input className="form-control" value={price} onBlur={onBlur} onChange={(e) => setprice(e.target.value)} />
                </div>


                <button className="btn btn-primary" >Submit</button>

            </form>
            {errors}
        </div>
    )

}

export default NewTitcket;