import { useState } from 'react'
import { Column } from './components/Columns'

const initialColumns = [
  {
    id: '0',
    name: 'TO DO',
    items: []
  },
  {
    id: '1',
    name: 'DOING',
    items: []
  },
  {
    id: '2',
    name: 'DONE',
    items: []
  }
]

function App() {
  document.body.style.backgroundColor = 'rgb(26, 32, 39)'
  const [columns, setColumns] = useState(initialColumns)
  const [itemId, setItemId] = useState(0)
  const columnsCopy = JSON.parse(JSON.stringify(columns))

  const removeItem = (column, id) => {
    const columnCopy = JSON.parse(JSON.stringify(column))
    const filteredItems = columnCopy.items.filter(item => item.id !== id)
    columnsCopy[column.id].items = filteredItems
    setColumns(columnsCopy)
  }

  const addItem = (column, text) => {
    const columnCopy = JSON.parse(JSON.stringify(column))
    const newItem = { id: itemId, content: text }
    columnsCopy[column.id].items = columnCopy.items = [
      ...columnCopy.items,
      newItem
    ]
    setColumns(columnsCopy)
    setItemId(itemId + 1)
  }

  const onDragEnd = results => {
    const { source, destination } = results

    // Pega o index das colunas
    const sourceIndex = source.droppableId
    const destinationIndex = destination.droppableId

    // Pega o index dos itens
    const sourceItemIndex = source.index
    const destinationItemIndex = destination.index

    const sameColumn = sourceIndex === destinationIndex

    // Pega o estado atual do array
    const sourceColumnItems = columnsCopy[sourceIndex].items
    const destinationColumnItems = columnsCopy[destinationIndex].items

    // Filtra o item e retira o que queremos mexer
    const filteredSrcColumnItems = sourceColumnItems.filter(
      item => item.id.toString() !== results.draggableId
    )

    // Pega o item "arrastado"
    const draggedItem = sourceColumnItems[sourceItemIndex]
    console.log(draggedItem)

    if (sameColumn) {
      // Coloca o item "arrastado" no local desejado em outra posição do array
      filteredSrcColumnItems.splice(destinationItemIndex, 0, draggedItem)

      columnsCopy[destinationIndex].items = filteredSrcColumnItems

      setColumns(columnsCopy)
    } else {
      // Adiciona o item "arrastado" para a nova coluna
      destinationColumnItems.splice(destinationItemIndex, 0, draggedItem)

      columnsCopy[sourceIndex].items = filteredSrcColumnItems
      columnsCopy[destinationIndex].items = destinationColumnItems

      setColumns(columnsCopy)
    }
  }

  return (
    <>
      <Column
        onDragEnd={onDragEnd}
        columns={columns}
        removeItem={removeItem}
        addItem={addItem}
      />
    </>
  )
}

export default App
