import {useEffect, useState} from "react";
import {apiLoadData} from "./api/data.ts";
import {transformData} from './utils/transformData'
import {DataItem} from "./types";
import Table from "./components/Table";


function App() {
  const [items, setItems] = useState<DataItem[]>([]);

  useEffect(() => {
    const apiData = apiLoadData();
    const transformedData = apiData.map(item => transformData(item))

    setItems(transformedData)
  }, [])

  function deleteItem(path: string[]){
    setItems(prevItems => deleteItemAtPath(prevItems, path))
  }

  function deleteItemAtPath(array: DataItem[], path: string[]){
    return array.reduce((acc: DataItem[], current: DataItem) => {
      if(current.id === path[0]){
        if(path.length === 1){
          return acc
        }

        acc.push({
          ...current,
          children: deleteItemAtPath(current.children, path.slice(1))
        })
      } else {
        acc.push(current)
      }

      return acc;
    }, [])
  }

  return (
    <div className={"container mx-auto p-4"}>
      <Table items={items} deleteItem={deleteItem}/>
    </div>
  )
}

export default App
