import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, Polyline } from 'react-google-maps';
import { connect } from 'react-redux';

import { pointsSelector, customizePoint } from '../../redux/ducks';

class Map extends Component {
  state = {
    center: undefined
  };

  componentDidMount() {
    this.geocoder = new window.google.maps.Geocoder();
  }

  componentDidUpdate(prevProps) {
    const { points } = this.props;
    if (prevProps.points !== points && points.length > 0) {
      const center = { lat: points[points.length - 1].lat, lng: points[points.length - 1].lng };
      /* eslint-disable-next-line */
      this.setState({ center });
    }
  }

  onMarkerDragEnd = (e, index) => {
    const { points, changePoint } = this.props;
    const { latLng } = e;
    const lat = latLng.lat();
    const lng = latLng.lng();
    const latlng = { lat, lng };
    const markers = [...points];
    this.geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          markers[index] = { ...markers[index], name: results[0].formatted_address, lat, lng };
          changePoint(markers[index], index);
        } else {
          console.log('No results found');
        }
      } else {
        console.log(`Geocoder failed due to: ${status}`);
      }
    });
  };

  render() {
    const { points } = this.props;
    const { center } = this.state;

    return (
      <GoogleMap defaultZoom={8} center={center || { lat: -34.397, lng: 150.644 }}>
        {points.length > 0 && points.map((item, index) => <Marker key={item.name} draggable onDragEnd={e => this.onMarkerDragEnd(e, index)} position={{ lat: item.lat, lng: item.lng }} />)}
        <Polyline
          path={points}
          geodesic
          options={{
            strokeColor: '#ff2527',
            strokeOpacity: 0.75,
            strokeWeight: 2
          }}
        />
      </GoogleMap>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changePoint: (point, index) => dispatch(customizePoint(point, index))
});

const mapStateToProps = state => ({
  points: pointsSelector(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withGoogleMap(Map));
