import { Draggable } from 'react-beautiful-dnd'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Paper, Typography } from '@mui/material'
import { DeleteRounded } from '@mui/icons-material'

export const Items = ({ column, removeItem, index }) =>
  column.items.map((item, itemIndex) => (
    <Draggable draggableId={item.id.toString()} index={itemIndex} key={item.id.toString()}>  
      {provided => (
        <Paper
          key={item.id.toString()}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          style={{
            borderRadius: '1rem',
            backgroundColor: 'dimgrey',
            height: '2.5rem',
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
            <div>
              <DeleteRounded onClick={() => removeItem(column, item.id, index) } />
            </div>
          </div>
        </Paper>
      )}
    </Draggable>
  ))
