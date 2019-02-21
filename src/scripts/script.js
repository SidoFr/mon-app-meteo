export function createUrl(loc) {
  if (loc.length === 1)
    return `https://${process.env.REACT_APP_API_CALL}q=${loc}${process.env.REACT_APP_API_KEY}&lang=fr&units=metric`;
  else {
    const lat = loc.lat;
    const lon = loc.lon;
    return `https://${process.env.REACT_APP_API_CALL}lat=${lat}&lon=${lon}${process.env.REACT_APP_API_KEY}&lang=fr&units=metric`;
  }
}

export function createUrl5(data) {
  if (data.length === 1)
    return `https://${process.env.REACT_APP_API_CALL5}q=${data}${process.env.REACT_APP_API_KEY}&lang=fr&units=metric`;
  else {
    const lat = data.lat;
    const lon = data.lon;
    return `https://${process.env.REACT_APP_API_CALL5}lat=${lat}&lon=${lon}${process.env.REACT_APP_API_KEY}&lang=fr&units=metric`;
  }
    
}

export function displayCurrentData(data) {
  const weather = {
    city: data.name,
    country: data.sys.country,
    icon: data.weather[0].icon,
    description: data.weather[0].description,
    celsius: `${data.main.temp.toFixed(1)}°c`, 
  };
  return weather;
}

// this is a fn which creates a slide effect when dom elt is clicked/touched
// voir notes en base de fichier
export function renderSlider(evt, elt, mouse) {
  evt.preventDefault();
  // where is cursor?
  const x = evt.pageX - elt.current.offsetLeft;
  // dif between last pos of cursor and now?
  // *x : move faster, better mvt
  const slide = (x - mouse[0]) * 2;
  // move the elt of the same amount of px
  elt.current.scrollLeft = mouse[1] - slide;
}
/* 

event.pageX renvoie la position de la souris par rapport au bord gauche du doc
event.pagey renvoie la position de la souris par rapport au top du doc
offsetLeft, renvoie la position d'un elt du dom par rapport au côté gauche de son elt parent
scrollLeft spec le nb de PX qu'un elt est scroll, vers la gauche

*/