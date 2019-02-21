import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { displayForecast } from '../scripts/cityForecast';
import { renderSlider } from '../scripts/script';
import Day from './Day';

class Daily extends React.Component {
  static propTypes = {
    coords: PropTypes.array,
    data: PropTypes.array,
  };

  state= {
    mouseDown: false,
    mouse: [],
    forecast: {},
  }

  detailsRef = React.createRef();

  componentDidMount() {
    const coords = this.props.coords;
    const lat = coords[0];
    const lon = coords[1];
    const query= `${lat},${lon}`;
    const url = `https://atlas.microsoft.com/timezone/byCoordinates/json?subscription-key=${process.env.REACT_APP_AZURE_KEY}&api-version=1.0&query=${query}`;
    axios.get(url)
    .then(response => {
      const data = response.data.TimeZones[0];
      const daylightSavings = data.ReferenceTime.DaylightSavings.split(':')[0];
      const standardOffset = data.ReferenceTime.StandardOffset.split(':')[0];
      // gives dst and offset compared UTC
      const dst= parseFloat(daylightSavings) !== 0 ? 
      parseFloat(daylightSavings) : 0;
      const offset = parseFloat(standardOffset) !== 0 ? 
        parseFloat(standardOffset) : 0;
      // now we need to take into account user offset
      const myOffset = (new Date(Date.now()).getTimezoneOffset()) / 60;
      const totalOffset = offset + dst + myOffset;
      const forecast = displayForecast(this.props.data, totalOffset);
      this.setState({
        forecast,
      });
    },
    error => {
      console.log('error at googleApi call/cityForecast, ',
      error);
    });    
  }

  handleMouse = (mouse, evt) => {
    if (mouse === 'up' || mouse === 'leave') 
      this.setState({
        mouseDown: false,
      });
    if (mouse === 'down') {
      const mousePosition = evt.pageX - this.detailsRef.current.offsetLeft;
      const scrollLeft = this.detailsRef.current.scrollLeft;
      this.setState({
        mouseDown: true,
        mouse: [mousePosition, scrollLeft],
      });
    }

    if (mouse === 'move' && this.state.mouseDown)
      renderSlider(evt, this.detailsRef, this.state.mouse);
  }

  render () {
    return (
      <div 
        className="details"
        ref ={ this.detailsRef }
        onMouseDown={ evt => this.handleMouse('down', evt) }
        onMouseUp={ evt => this.handleMouse('up', evt) }
        onMouseLeave={ evt => this.handleMouse('leave', evt) }
        onMouseMove={ evt => this.handleMouse('move', evt) }        
      >
        {
          Object.keys(this.state.forecast).map(day =>
            <Day day={ this.state.forecast[day] } key={ day } />
          )
          }
      </div>
    );
  }
};

export default Daily;