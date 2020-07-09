const request=require('postman-request')
const geolocation=(address,callback)=>{
    const geourl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiY2hlbm5ha2VzYXZhMjciLCJhIjoiY2tjYWZybTIxMDVjcDJ5cGplNTdpOGYyNiJ9.5j-Vyk4Ggd48mH7iIcQ_cQ&limit=1'
    request({url:geourl, json:true},(error,res)=>{
        if(error){
            console.log('Error in loading url')
            callback('Error in loading url',undefined)
        }
        else if(res.body.features.length===0){
            console.log('Error in search')
            callback('Error in search',undefined)
        }
        else{
            console.log('latitude: '+res.body.features[0].center[1] +' & longitude: '+res.body.features[0].center[0])
            const data= {
                longitude: res.body.features[0].center[0],
                latitude:res.body.features[0].center[1]
            }      
            callback(undefined,data)   
        }
    })
}

module.exports= geolocation