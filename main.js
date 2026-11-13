
function fetchData(){
  fetch("http://127.0.0.1:8000/api/v1/exchange-requests")
  .then(res => res.json())
  .then(data => {
    afficherLesLivres(data.data)
    afficherCategories(data.data)
    filterParNom(data.data)
    filterParType(data.data)
    
    console.log(data.data)

  })
  .catch(err => console.error(err))
}
fetchData()
let containerLivres = document.querySelector('.container')

function afficherLesLivres(data){
  let div = ''

  data.forEach(element => {
    div+= cardDiv(element)
  });
  containerLivres.innerHTML = div
}

function afficherCategories(data){
    let categories = new Set()
    data.forEach(element => {
        categories.add(element.book.category.name)
    })
    let options = ''
    categories.forEach(category => {
        options += `<option value="${category}">${category}</option>`
    })
    document.querySelector('.categories').innerHTML += options
    filterPaCategory(data)
}

function filterPaCategory(data) {
    document.querySelector('.categories').addEventListener('change', event => {
        let value = event.target.value
        if (value === '') {
            afficherLesLivres(data)
        } else {
            let dataFilter = data.filter(element =>
                element.book.category.name === value
            )
            afficherLesLivres(dataFilter)
        }
    })
}



function filterParNom(data){
  document.getElementById("searchLivre").addEventListener('input',event=>{
    let value = event.currentTarget.value
    let dataFilter = data.filter(data=>data.book.title.toLowerCase().includes(value.toLowerCase()))
    console.log("filter",dataFilter)

    if(dataFilter.length > 0)afficherLesLivres(dataFilter)
    else if(value.trim() == '') afficherLesLivres(data)
    else {
      let p = document.createElement("p")
      p.className = 'text-red-600 text-3xl w-full h-full flex justify-center align-center'
      p.textContent = 'Aucun resultat 😢'
      containerLivres.innerHTML = ``
      containerLivres.appendChild(p)
    }
  })
}

function filterParType(data){
  document.querySelector('.typeEchange').addEventListener('click',event=>{
    if(event.target.value == 'tous'){
      afficherLesLivres(data)
    }else if(event.target.value == 'definitif'){
      let dataFilter = data.filter(data=> data.exchange_type == 'permanent')
      afficherLesLivres(dataFilter)
    }else if(event.target.value == 'temporaire'){
      let dataFilter = data.filter(data=> data.exchange_type == 'temporary')
      afficherLesLivres(dataFilter)
    }
  })
}


document.getElementById("actualiser").addEventListener('click',event=>{
  containerLivres.innerHTML = ''
  console.log(containerLivres)
  fetchData()
})


function cardDiv(card) {
  return `

<div class=" border border-gray-200 shadow-lg rounded-xl transition-shadow hover:shadow-2xl">
    <div class="flex flex-col md:flex-row items-center justify-center gap-6">
        <div class="card-container w-full md:w-80 min-h-full bg-white">
            <div class="h-48 bg-gray-100 relative">
                <img src="http://127.0.0.1:8000${card.book.image_url}" alt="${card.book.title}"
                    class="w-full h-full object-contain p-2" />

                <div class="absolute top-3 right-3 flex gap-2">
                    <span
                        class="${card.status === 'cancelled' || card.status === 'closed' ? 'border border-red-200 bg-red-100 text-red-700':'border border-green-200 bg-green-100 text-green-700'} text-xs font-bold px-2 py-1 rounded-full ">${card.status}</span>
                    <span
                        class="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full border border-blue-200">${card.exchange_type}</span>
                </div>
            </div>
            <div class="p-5">
                <h3 class="text-lg font-bold text-gray-900 truncate">${card.book.title}</h3>
                <p class="text-sm text-gray-500">${card.book.author}</p>
                <div class="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200">
                    <img src="http://127.0.0.1:8000${card.owner.avatar}" alt="${card.owner.name}"
                        class="w-10 h-10 rounded-full object-cover border border-gray-300" />
                    <div>
                        <p class="text-sm font-semibold text-gray-800">${card.owner.name}</p>
                        <p class="text-xs text-gray-500">${card.owner.group_name}</p>
                    </div>
                </div>
                <div class="space-y-4 text-sm">
                    <h4 class="text-lg font-bold mb-4 border-b border-gray-700 pt-4">Détails de livre</h4>
                    <div class="flex justify-between items-center">
                        ${card.start_date||card.end_date ? `<span class="text-gray-400">Durée:</span>
                        <span class="font-medium text-blue-300">${card.start_date} - ${card.end_date}</span>`:``}
                    </div>
                    <div>
                        <span class="text-gray-400 block mb-2">Catégorie & Tags:</span>
                        <div class="flex gap-2 flex-wrap">
                            <span
                                class="bg-red-200 border border-red-700 text-red-600 px-2 py-1 rounded text-xs">${card.book.category.name}</span>
                            ${card.book.tags.map(tag => `<span
                                class="bg-gray-800 text-gray-200 px-2 py-1 rounded text-xs">${tag}</span>`).join('')}
                        </div>
                    </div>
                    <span class="text-gray-400 block mb-2">description: </span>
                    <p class="text-gray-400 block mb-2">${card.book.description}</p>
                </div>
            </div>
        </div>
        ${card.offers_count > 0?`<div class="flex items-center justify-center shrink-0">
            <i class="fa-solid fa-arrow-right-arrow-left text-2xl text-blue-600"></i>
        </div>` : ''}

       ${card.offers_count > 0?
        card.offers.map(offer=>{
          
          return `
        <div class="card-container w-full md:w-80 min-h-full bg-white ">
            <div class="h-48 bg-gray-100 relative">
                <img src="book-4.svg" alt="${offer.offered_book.title}"
                    class="w-full h-full object-contain p-2" />

                <div class="absolute top-3 right-3 flex gap-2">
                    <span
                        class="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full border border-blue-200">${offer.status}</span>
                </div>
            </div>
            <div class="p-5">
                <h3 class="text-lg font-bold text-gray-900 truncate">${offer.offered_book.title}</h3>
                <p class="text-sm text-gray-500">${offer.offered_book.author}</p>
                <div class="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200">
                    <img src="http://127.0.0.1:8000${offer.author.avatar}" alt="${offer.offered_book.author}"
                        class="w-10 h-10 rounded-full object-cover border border-gray-300" />
                </div>
                <div class="space-y-4 text-sm">
                    <h4 class="text-lg font-bold mb-4 border-b border-gray-700 pt-4">Détails de livre</h4>
                    <div>
                        <span class="text-gray-400 block mb-2">Catégorie & Tags:</span>
                        <div class="flex gap-2 flex-wrap">
                            <span
                                class="bg-red-200 border border-red-700 text-red-600 px-2 py-1 rounded text-xs">${offer.offered_book.category.name}</span>
                            ${offer.offered_book.tags.map(tag => `<span
                                class="bg-gray-800 text-gray-200 px-2 py-1 rounded text-xs">${tag}</span>`).join('')}
                        </div>
                    </div>
                    <span class="text-gray-400 block mb-2">message: </span>
                    <p class="text-gray-400 block mb-2">${offer.message}</p>

                    <span class="text-gray-400 block mb-2">description: </span>
                    <p class="text-gray-400 block mb-2">${offer.offered_book.description}</p>
                </div>
            </div>
        </div>`
        
        }).join('')
        :
        ``


       }


       
    </div>
</div>
  
  `
}

