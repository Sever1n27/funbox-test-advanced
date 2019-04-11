import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Wrapper = styled.div`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  display: flex;
  border: 1px solid #ddd;
  width: 100%;
  border-radius: 4px;
  align-items: center;
  background: #fff;
  cursor: grab;
  & + & {
    margin-top: 20px;
  }
  transition: all 0.3s ease;
`;

const Name = styled.div`
  margin-right: 20px;
`;

const StyledButton = styled.button`
  background: red;
  border-radius: 4px;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const Point = ({ item, handleRemovePlace, index }) => {
  return (
    <Draggable draggableId={item.name} index={index}>
      {(provided, snapshot) => (
        <Wrapper ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Name>{item.name}</Name>
          <StyledButton type="submit" data-name={item.name} onClick={handleRemovePlace}>
            remove
          </StyledButton>
          {provided.placeholder}
        </Wrapper>
      )}
    </Draggable>
  );
};

export default Point;
