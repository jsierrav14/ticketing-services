import buildClient from '../api/build-client'


const LandingPage = ({currentUser}) =>{
    console.log('I am in the component',currentUser)
    return currentUser ? <h1>You are signed id</h1> :<h1>You are not signed in</h1>
}

LandingPage.getInitialProps = async(context)=>{

    const {data} = await buildClient(context).get('/api/users/currentuser')
    return data

    

}
export default LandingPage