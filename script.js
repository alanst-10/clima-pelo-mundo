document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if(input !== '') {
        clearInfo();
        showWarning('Carregando...')
    }    

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=5d8c12c0f8fdb4ada7f83f444ea1b83c&units=metric&lang=pt_br`
    
    let results = await fetch(url);
    let json = await results.json();

    if(json.cod === 200) {
        showInfo({
            name: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            windAngle: json.wind.deg,
            tempMin: json.main.temp_min,
            tempMax: json.main.temp_max,
            porDoSol: json.sys.sunset,
            nascerDoSol: json.sys.sunrise
        })
    } else {
        clearInfo();
        showWarning('Não encontramos essa localização.')
    }

});

function showInfo(json) {
    showWarning('');
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`;
    document.querySelector('.minima').innerHTML = `${json.tempMin} <sup>ºC</sup>`;
    document.querySelector('.maxima').innerHTML = `${json.tempMax} <sup>ºC</sup>`;

    let unix_timestamp2 = json.nascerDoSol;
    let date2 = new Date(unix_timestamp2 * 1000);
    let hour2 = date2.getHours();
    let minute2 = date2.getMinutes();
    let timeformated2 = `${fixZero(hour2)}:${fixZero(minute2)}`;

    document.querySelector('.nascerInfo').innerHTML = `${timeformated2}`;

    let unix_timestamp = json.porDoSol;
    let date = new Date(unix_timestamp * 1000);
    let hour = date.getHours();
    let minute = date.getMinutes();
    let timeformated = `${fixZero(hour)}:${fixZero(minute)}`;

    document.querySelector('.porInfo').innerHTML = `${timeformated}`;

    document.querySelector('.resultado').style.display = 'block';
}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}

function fixZero(time) {
    return time < 10 ? `0${time}` : time;
}