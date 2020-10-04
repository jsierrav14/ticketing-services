import axios from 'axios'


const LandingPage = ({currentUser}) =>{
    console.log('I am in the component',currentUser)
    return <h1>Langing page</h1>
}

LandingPage.getInitialProps = async()=>{

    const response = await axios.get('/api/users/currentuser')

    return response.data
}
export default LandingPage