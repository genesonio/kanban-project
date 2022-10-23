import { useState } from 'react'
import { Column } from './components/Columns'

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
  document.body.style.backgroundColor = 'rgb(26, 32, 39)'

  const [columns, setColumns] = useState(initialColumns)

  const onDragEnd = results => {
    const { source, destination } = results
    console.log(results)

    // Pega o index das colunas
    const sourceIndex = source.droppableId
    const destinationIndex = destination.droppableId

    // Pega o index dos itens
    const sourceItemIndex = source.index
    const destinationItemIndex = destination.index

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
    let draggedItem = (sourceColumnItems = sourceColumnItems[sourceItemIndex])

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

  return <Column onDragEnd={onDragEnd} columns={columns} />
}

export default App
