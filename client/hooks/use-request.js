import axios from 'axios'
import { useState } from 'react'

export default ({ url, method, body,onSuccess }) => {

    const [errors, setErrors] = useState(null)
    const doRequest = async(props = {}) => {

        try {

            setErrors(null)
            const response = await axios[method](url,  {
                ...body,...props
            
            } )

            if(onSuccess){
              onSuccess(response.data)
            }
            return response.data
        } catch (err) {
            setErrors(<div className="alert alert-danger">
                <h4>Opps....</h4>
                <ul>
                    {err.response.data.errors.map((err, key) => <li key={key}>{err.message}</li>)}
                </ul>

            </div>)

            throw err
        }

    }

    return { doRequest, errors }
}