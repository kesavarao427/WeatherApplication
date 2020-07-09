console.log("client side javascript")


const weatherform=document.querySelector('form')
const search=document.querySelector('input')

weatherform.addEventListener('submit',(eve)=>{
    eve.preventDefault()
    console.log('After clicking submit')
    console.log(search.value)
    document.getElementById('temper').innerText='Loading...'

    // fetch('http://localhost:3000/weather?address='+search.value).then((response)=>{
    fetch('/weather?address='+search.value).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            document.getElementById('temper').innerText=data.error
        }
        else{
            console.log(data)
            // document.getElementById('error_1').innerText=''
            document.getElementById('temper').innerText='Temperature : '+data.temperature
            document.getElementById('precip').innerText='Precipitation : '+data.precipitation
            
        }
    })
})
})
