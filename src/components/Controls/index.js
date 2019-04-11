import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';

import { pointsSelector, newPoint, deletePoint, newOrder } from '../../redux/ducks';

import PointsList from './PointsList';
import Point from './Point';

const Wrapper = styled.div`
  width: 50%;
  background: #fff;
  height: 100%;
  padding: 30px;
`;

const Input = styled.input`
  background: #fff;
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  width: 100%;
`;

class Controls extends Component {
  state = {
    value: ''
  };

  searchRef = React.createRef();

  handleAddPlace = item => {
    const { addPoint } = this.props;
    const place = item[0];
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const newObj = {
      name: place.formatted_address,
      lat,
      lng
    };
    addPoint(newObj);
    this.setState({ value: '' });
  };

  handleInputChange = e => {
    this.setState({ value: e.target.value });
  };

  handleRemovePlace = e => {
    const { removePoint } = this.props;
    e.preventDefault();
    const place = e.target.dataset.name;
    removePoint(place);
  };

  onDragEnd = result => {
    const { destination, source } = result;
    const { reorderList } = this.props;
    reorderList(source.index, destination.index);
  };

  render() {
    const { value } = this.state;
    const { points } = this.props;
    return (
      <Wrapper>
        <StandaloneSearchBox
          ref={this.searchRef}
          onPlacesChanged={() => {
            this.handleAddPlace(this.searchRef.current.getPlaces());
          }}
        >
          <Input type="text" value={value} onChange={this.handleInputChange} placeholder="Начните вводить название места" />
        </StandaloneSearchBox>

        {points.length > 0 && (
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable-1" type="points">
              {(provided, snapshot) => (
                <PointsList>
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {points.map((item, index) => (
                      <Point key={item.name} item={item} index={index} handleRemovePlace={this.handleRemovePlace} />
                    ))}
                    {provided.placeholder}
                  </div>
                </PointsList>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  points: pointsSelector(state)
});

const mapDispatchToProps = dispatch => ({
  addPoint: point => dispatch(newPoint(point)),
  removePoint: point => dispatch(deletePoint(point)),
  reorderList: (from, to) => dispatch(newOrder(from, to))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls);
