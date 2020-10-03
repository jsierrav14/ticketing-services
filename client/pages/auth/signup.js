import { useState } from 'react'
import axios from 'axios'
export default () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])
    const onSubmit = async (event) => {
        event.preventDefault()


        try {
            const response = await axios.post('/api/users/signup', {
                email, password
            })
            console.log(response.data)
        } catch (error) {

            console.log(error)
            setErrors(error.response.data.errors)

        }



    }
    return <form onSubmit={onSubmit}>
        <h1>Sign up</h1>
        <div className="form-group">
            <label>Email addres</label>
            <input className="form-control" type="text" value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        <div className="form-group">
            <label>Password</label>
            <input className="form-control" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="alert alert-danger">
            <h4>Opps....</h4>
            <ul>
             {errors.map((err,key) => <li key={key}>{err.message}</li>)}
            </ul>
           
        </div>
        <button className="btn btn-primary"> Sign up</button>

    </form>
}