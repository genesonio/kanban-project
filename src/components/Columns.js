import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { Items } from './Items'
import { Paper, Typography } from '@mui/material'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

export const Column = ({ onDragEnd, columns }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center'
    }}
  >
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
          <Typography variant="h2" fontWeight={700} color="#324057">
            {column.name}
          </Typography>
          <Droppable droppableId={index.toString()} key={column.id}>
            {provided => (
              <Paper
                elevation={12}
                ref={provided.innerRef}
                style={{
                  backgroundColor: 'rgb(18, 18, 18)',
                  borderRadius: '1.5rem',
                  width: '20rem',
                  height: '30rem',
                  margin: '.5rem',
                  padding: '1rem'
                }}
              >
                <Items column={column} />
                {provided.placeholder}
              </Paper>
            )}
          </Droppable>
        </div>
      ))}
    </DragDropContext>
  </div>
)
