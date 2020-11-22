let mapInstance

// Para obtener el Id de la tienda
const shopIdtoMap = document.querySelector('#shopIDtoMap')
const shopId = shopIdtoMap.innerHTML

function initApp() {
    drawMap()
    getShopsFromAPI()
}


function drawMap() {

    mapInstance = new google.maps.Map(
        document.querySelector('#shopMap'),
        { center: { lat: 39.863390, lng: -4.027755 }, zoom: 13, styles: mapStyles.retro }
    )
}


function getShopsFromAPI() {

    let shopFind

    axios
        .get('/api/shops')
        .then(response => {
            
            let shopsArray = response.data
            shopsArray.forEach(elm => {
                if (elm._id === shopId) {
                    shopFind = elm
                }
            })
            drawMarkers(shopFind)

        })
        .catch(err => console.log(err))
}


function drawMarkers(shopFind) {

        let position = { lat: shopFind.location.coordinates[0], lng: shopFind.location.coordinates[1] }
        let imgMarker

        switch (shopFind.nationality) {     // Para cambiar el Marker según el valor de la propiedad "nationality"

            case "Italian":
                imgMarker = "/images/coffeeMarker.png"
                break
            
            case "Mexican":
                imgMarker = "/images/bookMarker.png"
                break
            
            case "Colombian":
                imgMarker = "/images/bookMarker.png"
                break
            
            case "Chinese":
                imgMarker = "/images/bookMarker.png"
                break
            
            default:
                imgMarker = "/images/defaultMarker.png"
        }
   
        new google.maps.Marker({
            map: mapInstance,
            position,
            title: shopFind.name,
            icon: imgMarker
        })

    mapInstance.setCenter({ lat: shopFind.location.coordinates[0], lng: shopFind.location.coordinates[1] })
}