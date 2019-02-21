import React from 'react';
import PropTypes from 'prop-types';

class Search extends React.Component {
  static propTypes = {
    searchCity: PropTypes.func,
    searchCoords: PropTypes.func,
  };

  cityRef = React.createRef();

  getCity = evt => {
    evt.preventDefault();
    const city = this.cityRef.current.value;
    evt.currentTarget.reset();
    this.props.searchCity(city);
  }
  getLoc = () => {
    const props = this.props;
    function getPos(position) {
      const [latitude, longitude] =
        [position.coords.latitude, position.coords.longitude];
      const loc = {
        lat: latitude,
        lon: longitude,
      };
      props.searchCoords(loc);
    }
    if (!navigator.geolocation) {
      console.log("no geolocation available")
    } else {
      navigator.geolocation.getCurrentPosition(getPos);
    }
  }
  render() {
    return(
      <div className="search">
        <div className="search_search">
          <div className="search_geo" onClick={ ()=> this.getLoc() }>
            Accepter la géolocalisation
          </div>
          <form 
            className="search_input"
            onSubmit={ (evt) => this.getCity(evt) }
          >
            <input className="search_input_input"
              type="text"
              ref={ this.cityRef }
              placeholder="ex, paris ou paris, fr"
            />
            <input className="search_submit"
              type="submit"
              value="chercher"
            />
          </form>
        </div>
        <p className="search_welcome">
          *Une app simple, gratuite et sans recueil de données.<br/>
          Elle vous indiquera la météo là où vous vous trouvez ou dans la ville de votre choix (heure locale)
          au moment présent et à 5 jours.<br/>
          <em>nb: Elle utilise des données météo en provenance des usa.<br/>
          Ainsi, en cas de problèmes, pensez à entrer
          un nom anglais plutôt que français (ex, Beijing, cn au lieu de Pékin).</em>
        </p>
      </div>
    )
  }
  
}

export default Search;