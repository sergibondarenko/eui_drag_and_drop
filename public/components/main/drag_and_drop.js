import React, { useState } from 'react';
import {
  EuiDragDropContext,
  EuiDraggable,
  EuiDroppable,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiPanel,
} from '@elastic/eui';

import { euiDragDropReorder } from '@elastic/eui';

// import { makeList } from './helper';

export const DragAndDrop = () => {
  // const [list, setList] = useState(makeList(3));
  const [list, setList] = useState([
    { content: 'item 0', id: '238924759' },
    { content: 'item 1', id: '198098201' },
    { content: 'item 2', id: '223423990' }
  ]);
  const onDragEnd = ({ source, destination }, other) => {
    console.log('my drag and drop -- onDragEnd -- source', source);
    console.log('my drag and drop -- onDragEnd -- destination', destination);
    if (source && destination) {
      const items = euiDragDropReorder(list, source.index, destination.index);

      setList(items);
    }
  };
  return (
    <EuiDragDropContext onDragEnd={onDragEnd}>
      <EuiDroppable
        droppableId="CCCCUSTOM_HANDLE_DROPPABLE_AREA"
        spacing="m"
        withPanel
       >
          <>
            {list.map(({ content, id }, idx) => (
              <EuiDraggable
                spacing="m"
                key={id}
                index={idx}
                draggableId={id}
                customDragHandle={true}>
                {provided => (
                  <EuiPanel paddingSize="m">
                    <EuiFlexGroup>
                      <EuiFlexItem grow={false}>
                        <div {...provided.dragHandleProps}>
                          <EuiIcon type="grab" />
                        </div>
                      </EuiFlexItem>
                      <EuiFlexItem>{content}</EuiFlexItem>
                    </EuiFlexGroup>
                  </EuiPanel>
                )}
              </EuiDraggable>
            ))}
          </>
      </EuiDroppable>
    </EuiDragDropContext>
  );
};