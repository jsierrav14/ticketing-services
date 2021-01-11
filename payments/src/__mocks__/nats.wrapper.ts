export const natsWrapper = {
    client:{
        publish:jest.fn().mockImplementation((subjects:string,data:string, callback:()=>void)=>{
            callback()
        })
    }
}