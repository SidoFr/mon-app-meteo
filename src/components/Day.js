import React from 'react';
import PropTypes from 'prop-types';

class Day extends React.Component {
  static propTypes = {
    day: PropTypes.array,
  };

  render () {
    return (
      <div className="day">
        <h2 className="day_day">{ this.props.day[0].day }</h2>
        <div className="day_forecast">
        {
          this.props.day.map(moment => 
            <div className="moment" key={ `${this.props.day[0].day}/${moment.time}`}>
              <h3 className="moment_time">{ moment.time }</h3>
              <div className="moment_forecast">
                <img src={ `./icons/${moment.icon}.png` } alt="icône" />
                <p className="moment_celsius">{ moment.celsius }°c</p> 
              </div>
            </div>
          )
        }
        </div>
      </div>
    );
  }
};

export default Day;