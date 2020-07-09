const express= require('express')
const path= require('path')
const hbs=require('hbs')
const geolocation=require('./utils/geolocation.js')
const weatherstack=require('./utils/weatherstack.js')

console.log(path.join(__dirname,'../public'))
console.log(__filename)
const app=express()


app.set('view engine','hbs') // to set the engine

const dir=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')


app.set('views',viewpath) // this can be used if we change the name of views folder to something else
//set up static directory to serve
app.use(express.static(dir)) // to use it as static directory so that html can use directly /css/style.css or other public directories

hbs.registerPartials(partialspath)
// app.get('',(req, res)=>{
//     res.send('Home Page!!')
// })

// app.get('/help',(req,res)=>{
//     res.send('Help Page')
// })

// app.get('/about',(req,res)=>{
//     res.send('About Me')
// })

app.get('',(req,res)=>{
    res.render('index',{
        name:'Keshav',
        title:'Photography Shootouts'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        name:'Keshav',
        title:'About'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        name:'Keshav',
        title:'Help'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title: "404 Page not found inside help",
        name:'Keshav'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "Input a address to search"
        })
    }
    // res.send({
    //     forecast:'It is raining',
    //     location:'Mandapeta'
    // })
    geolocation(req.query.address,(error,data)=>{
        //console.log(data.longitude, data.latitude)
        if(error!==undefined){
            return res.send({
                error: "Input address doesn't exists"
            })
        }
        weatherstack(data.latitude,data.longitude,(error,weather)=>{
            if(error!==undefined){
                return res.send({
                    error: "Input address doesn't exists from weather stack"
                })
            }
            res.send({
                longitude:data.longitude,
                latitude:data.latitude,
                temperature:weather.temperature,
                precipitation:weather.precip,
                address:req.query.address
            })
            
        })

    })

})

app.get('*',(req,res)=>{
    res.render('error',{
        title: "404 Page not found",
        name:'Keshav'
    })
})
// app.listen(3000,()=>{
//     console.log('Server is up and running')
// })

const  port=process.env.PORT || 3000  // for heroku application || is logical or
app.listen(port,()=>{
    console.log('Server is up and running '+port)
})