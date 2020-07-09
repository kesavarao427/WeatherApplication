const request=require('postman-request')
const weatherstack=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=583c7fa1d6376d077886ea807fe17883&query='+latitude+','+longitude

    // request({url:url}, (error,response)=>{
    //     //console.log(response.body)
    //     const dataJSON=JSON.parse(response.body)   //need to conver it into json
    //     console.log(dataJSON.current)
    // })

    request({url:url, json:true}, (error,response)=>{ // if json is added as true then no need to parse it like above
        //console.log(response.body.current)
        if(error){
            console.log('Error in loading url')
            callback('Error in loading url from method',undefined)
        }
        else if(response.body.error){
            console.log('Error in search')
            callback('Error in search from method',undefined)
        }
        else{
            console.log("The current temperature is "+response.body.current.temperature+". There is "+response.body.current.precip+"% chance of precipitation.")
            data={
                temperature:response.body.current.temperature,
                precip:response.body.current.precip
            }
            callback(undefined,data)
        }
    })
}

module.exports=weatherstack