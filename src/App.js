import { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const initialItems = [
  { id: '1', content: 'Conteúdo 1' },
  { id: '2', content: 'Conteúdo 2' },
  { id: '3', content: 'Conteúdo 3' }
]

const initialColumns = [
  {
    id: '1',
    name: 'To do',
    items: initialItems
  },
  {
    id: '2',
    name: 'Doing',
    items: [{ id: '4', content: 'Estou aqui' }]
  },
  {
    id: '3',
    name: 'Done',
    items: []
  }
]

function App() {
  const [columns, setColumns] = useState(initialColumns)

  const onDragEnd = results => {
    const { source, destination } = results

    const sourceIndex = source.droppableId
    const destinationIndex = destination.droppableId

    const sameColumn = sourceIndex === destinationIndex

    // Pega o estado atual do array
    let sourceColumnItems = columns[sourceIndex].items
    let destinationColumnItems = columns[destinationIndex].items

    // Deepcopy do state
    let columnsCopy = JSON.parse(JSON.stringify(columns))

    // Filtra o item e retira o que queremos mexer
    let filteredSrcColumnItems = sourceColumnItems.filter(
      item => item.id !== results.draggableId
    )

    // Pega o item "arrastado"
    let draggedItem = (sourceColumnItems =
      sourceColumnItems[results.source.index])

    if (sameColumn) {
      // Coloca o item "arrastado" no local desejado em outra posição do array
      filteredSrcColumnItems.splice(results.destination.index, 0, draggedItem)

      columnsCopy[destinationIndex].items = filteredSrcColumnItems
      setColumns(columnsCopy)
    } else {
      // Adiciona o item "arrastado" para a nova coluna
      destinationColumnItems.splice(results.destination.index, 0, draggedItem)

      columnsCopy[sourceIndex].items = filteredSrcColumnItems
      columnsCopy[destinationIndex].items = destinationColumnItems

      setColumns(columnsCopy)
    }
  }

  return (
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
                  {column.items.map((item, index) => (
                    <Draggable
                      draggableId={item.id.toString()}
                      index={index}
                      key={item.id}
                    >
                      {provided => (
                        <div
                          key={item.id}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          style={{
                            backgroundColor: 'whitesmoke',
                            height: '2.5rem',
                            marginBottom: '.5rem',
                            ...provided.draggableProps.style
                          }}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
  )
}

export default App
