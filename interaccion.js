const input = document.getElementById('inputBusqueda');
const btn = document.getElementById('buscar');
const resultado = document.getElementById('contenido');
const APIKEY = 'bdd70ada629d36d7b31f0b56dc0998a7';



    



btn.addEventListener('click',event => {
    event.preventDefault();
    if(input.value ===''){
        mostrarError('Debe ingresar un lugar para buscar el clima.');
        return;
    }
    alert(`Se estan buscando los datos de: ${input.value}`);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${APIKEY}&units=metric`)
        .then(function(respuesta){
        return respuesta.json();
    })
        .then(function(json){
        console.log(json)
        resultado.innerHTML = `<h2 id="nombre_ciudad">${json.name}</h2>
        <h3 id= "temp">${json.main.temp}°C</h3>
        <img src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png" alt="imagen que describe el clima">
        <p>Temperatura maxima: ${json.main.temp_max}°C</p>
        <p>Temperatura minima: ${json.main.temp_min}°C</p>
        <p>Humedad: ${json.main.humidity}%</p>
        <p>Sensacion termica: ${json.main.feels_like}°C</p>
        <p>Presion atmosferica: ${json.main.pressure}hPa</p>
        <p>Velocidad del viento: ${json.wind.speed}metros/seg.</p>
        `;

    })
    .catch(function(error){
        mostrarError(`el nombre ${input.value} no pertenece a una ciudad registrada`)
        console.log('algo salio mal')
        return;
    })
    .finally(function(json){
        console.log(`La busqueda se realizo correctamente.`)
    });
    })


function mostrarError(mensaje){
        console.log(mensaje);
        const mensajeerror = document.createElement('p');
        mensajeerror.classList.add('mensaje_error');
        mensajeerror.innerHTML = mensaje;
        resultado.appendChild(mensajeerror);

        setTimeout(() => {
            mensajeerror.remove();
        }, 3000);
    }