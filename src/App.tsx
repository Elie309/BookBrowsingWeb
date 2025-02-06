import { Book } from "@elie309/bookbrowsinglibrary";
import { useEffect } from "react"

function App() {

  const fetchFunction = () => {
    let book = new Book("The Great Gatsby", "F. Scott Fitzgerald", "1925", []);
    console.log(book.title)
  }

  useEffect(() => {
    console.log("Hello World!")
    fetchFunction()
  }, [])
  return (
    <>
      <p>Hello World!</p>
    </>
  )
}

export default App
