import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { Items } from './Items'

export const Column = ({ onDragEnd, columns }) => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <DragDropContext onDragEnd={onDragEnd}>
      {columns.map((column, index) => (
        <div
          key={column.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <h1>{column.name}</h1>
          <Droppable droppableId={index.toString()} key={column.id}>
            {provided => (
              <div
                ref={provided.innerRef}
                style={{
                  backgroundColor: 'lightblue',
                  width: '20rem',
                  height: '30rem',
                  margin: '.5rem',
                  padding: '1rem'
                }}
              >
                <Items column={column} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      ))}
    </DragDropContext>
  </div>
)
