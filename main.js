
fetch("http://127.0.0.1:8000/api/v1/books")
  .then(res => res.json())
  .then(data => console.log(data.data))
  .catch(err => console.error(err))

function afficher(data){
  data.forEach(element=>{
    
  })
}