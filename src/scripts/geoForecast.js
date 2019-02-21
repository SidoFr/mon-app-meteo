/*
1/ l'api renvoie les infos au temps UTC
*/
export function displayForecastByGeo(data) {
  const today = new Date(); // today, date
  const todayInWeek = new Date().getDay();
  let tomorrow = new Date();
  // the day after today, etc...
  const dayAfter = tomorrow.setDate(today.getDate()+1);
  const dayPlusTwo = tomorrow.setDate(new Date(dayAfter).getDate()+1);
  const dayPlusThree = tomorrow.setDate(new Date(dayPlusTwo).getDate()+1);
  const dayPlusFour = tomorrow.setDate(new Date(dayPlusThree).getDate()+1);
  
  // list is an array with all forecast
  const list = data.list;

  // create an array for each forecast day
  // each array will contain objects corresponding to a moment of the day
  const one = [];
  const two = [];
  const three = [];
  const four = [];
  const five = [];

  const week = ['dimanche', 'lundi', 'mardi', 'mercredi',
      'jeudi', 'vendredi', 'samedi'];

  const createDay = (obj, moment) => {
    const day = week[new Date(obj.dt*1000).getDay()];
    const time = moment.split(' ')[4].slice(0, 5);
    const slice = {
      day,
      time,
      celsius: obj.main.temp.toFixed(1),
      icon: obj.weather[0].icon,
    };
    return slice;
  }



  list.forEach(obj => {
    // the day of the object, this is a timestamp
    const moment = `${new Date(obj.dt*1000)}`;
    const dayOfWeek = new Date(obj.dt*1000).getDay();

    // dispatch objects in corresponding day array
    if (dayOfWeek === todayInWeek) {
      one.push(createDay(obj, moment));
    }
    if (dayOfWeek === new Date(dayAfter).getDay()) {
      two.push(createDay(obj, moment));
    }
    if (dayOfWeek === new Date(dayPlusTwo).getDay()) {
      three.push(createDay(obj, moment));
    }
    if (dayOfWeek === new Date(dayPlusThree).getDay()) {
      four.push(createDay(obj, moment));
    }
    if (dayOfWeek === new Date(dayPlusFour).getDay()) {
      five.push(createDay(obj, moment));
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