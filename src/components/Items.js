import { Draggable } from 'react-beautiful-dnd'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Paper, Typography } from '@mui/material'
import { Delete } from '@mui/icons-material'

export const Items = ({ column }) =>
  column.items.map((item, index) => (
    <Draggable draggableId={item.id.toString()} index={index} key={item.id}>
      {provided => (
        <Paper
          key={item.id}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          style={{
            borderRadius: '1rem',
            backgroundColor: 'dimgrey',
            height: '2.5rem',
            marginBottom: '.5rem',
            ...provided.draggableProps.style
          }}
        >
          <div
            style={{
              padding: '.2rem',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography
              variant="overline"
              paragraph={true}
              align="center"
              fontWeight={500}
            >
              {item.content}
            </Typography>
          </div>
        </Paper>
      )}
    </Draggable>
  ))
