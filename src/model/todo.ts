// {
//     "id": "comprare-1742977806890",
//     "priority": 3, 
//     "description":"comprare il pane",
//     "creationDate": 1742977806890,
//     "terminationDate": 1744977806890,
// }

export default interface Todos {
    id: string
    priority: number
    description: string
    creationDate: number
    terminationDate?: number
}
  