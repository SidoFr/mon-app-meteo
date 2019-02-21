export const getData = (data) => {  
  const list = data.list;
  const lat = data.city.coord.lat;
  const lon = data.city.coord.lon;
  const datas = {
    loc: [lat, lon],
    forecast: [],
  };

  list.forEach( obj => {
    const newObject = {
      timestamp: obj.dt *1000,
      celsius: obj.main.temp.toFixed(1),
      icon: obj.weather[0].icon,
    };
    datas.forecast.push(newObject);
  });
  return datas;
}


export function displayForecast(data, offset) {
  // a fn to chge a timestamp regarding offset
  const calculateTS = timestamp => {
  return timestamp + (offset * 3600000);
}

  const today = new Date(calculateTS(Date.now()));
  let tomorrow = new Date(calculateTS(Date.now()));
  // the day after today, etc...
  const dayAfter = tomorrow.setDate(today.getDate()+1);
  const dayPlusTwo = tomorrow.setDate(new Date(dayAfter).getDate()+1);
  const dayPlusThree = tomorrow.setDate(new Date(dayPlusTwo).getDate()+1);
  const dayPlusFour = tomorrow.setDate(new Date(dayPlusThree).getDate()+1);

  // create an array for each forecast day
  // each array will contain objects = moment of the day
  const one = [];
  const two = [];
  const three = [];
  const four = [];
  const five = [];
  const createDay = (obj) => {
    const week = ['dimanche', 'lundi', 'mardi', 'mercredi',
      'jeudi', 'vendredi', 'samedi'];
    const day = week[new Date(obj.localTimestamp).getDay()];
    const slice = {
      day,
      time: obj.time,
      celsius: obj.celsius,
      icon: obj.icon,
    };

    return slice;
  }

  data.forEach(obj => {

    // moment timestamp + offset
    const localTimestamp = calculateTS(obj.timestamp);
    const localMoment = new Date(localTimestamp);
    const day = localMoment.getDay();
    
    const newObj = {
      celsius: obj.celsius,
      icon: obj.icon,
      localTimestamp,
      time: `${localMoment}`.split(' ')[4].slice(0,5),
    };
    
    if (day === today.getDay()) {
      one.push(createDay(newObj));
    }
    if (day === new Date(dayAfter).getDay()) {
      two.push(createDay(newObj));
    }
    if (day === new Date(dayPlusTwo).getDay()) {
      three.push(createDay(newObj));
    }
    if (day === new Date(dayPlusThree).getDay()) {
      four.push(createDay(newObj));
    }
    if (day === new Date(dayPlusFour).getDay()) {
      five.push(createDay(newObj));
    }
  });
  const forecast = {
    one,
    two,
    three,
    four,
    five,
  };
  return forecast;
}
