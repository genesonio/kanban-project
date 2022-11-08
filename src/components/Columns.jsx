import { DragDropContext, Droppable } from 'react-beautiful-dnd' 
import { Items } from './Items'
import { Paper, Typography, Icon, TextField } from '@mui/material'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { useState } from 'react'

export const Columns = ({ onDragEnd, columns, removeItem, addItem }) => {
  const [text, setText] = useState('')

  return <div
      style={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
  />
      <DragDropContext onDragEnd={onDragEnd}>
      {columns.map((column, index) => (
          <div
            key={parseInt(column.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography variant="h2" fontWeight={700} color="#324057">
              {column.name}
            </Typography>
            <Droppable droppableId={column.id} key={column.id}>
              {provided => (
                <Paper
                  elevation={12}
                  style={{
                    backgroundColor: 'rgb(18, 18, 18)',
                    borderRadius: '1.5rem',
                    width: '20rem',
                    height: '30rem',
                    margin: '.5rem',
                    padding: '1rem'
                  }}
                >
                  <div
                    style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '.5rem'
                  }}>
                    <TextField
                      onKeyDown={(ev) => {
                        const { key } = ev
                        if (key === 'Enter') {
                          addItem(column, text)      
                          ev.preventDefault()
                        }

                      }}
                      onChange={(e) => setText(e.target.value)}
                      fullWidth
                      variant='standard'
                      color='primary'
                      sx={{input:{color: 'whitesmoke'}}} />
                    <Icon
                      style={{
                        marginLeft:'1rem'
                      }}
                      onClick={() => addItem(column, text)}
                      color='primary'>add_circle</Icon>
                </div>
                <div ref={provided.innerRef} style={{height: '100%',display: 'flex',
                    flexDirection: 'column',
                    gap: '.5rem'}}>
                  <Items column={column} removeItem={removeItem} index={index} />
                  {provided.placeholder}
                </div>
                </Paper>
              )}
              </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
  
}