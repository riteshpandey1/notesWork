import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState();

  
  const addNotes = async (e) => {
    e.preventDefault();
    console.log(notes);

    let result = await fetch("http://localhost:8000/add-notes", {
      method: "post",
      body: JSON.stringify({
        title: notes,
        time: new Date().toJSON(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    setNotes("");
  };

  const [notesList, setNotesList] = useState([]);

  useEffect(() => {
    getApiProduct();
  }, []);

  const getApiProduct = async () => {
    const apiList = await fetch("http://localhost:8000/get-notes");
    let result = await apiList.json();
    setNotesList(result);
  };

  const deleteProduct = async (ids) => {
    let deleteData = await fetch(`http://localhost:8000/delete-notes/${ids}`, {
      method: "delete",
    });
    // console.log(deleteData);
    // deleteData = await deleteData.json();
    // console.log(deleteData);
    if (deleteData) {
      getApiProduct();
    }
  };

  return (
    <div className="App">
      <form action="">
        <input
          type="text"
          placeholder="Take a notes.."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button onClick={addNotes}>Add notes</button>
      </form>

      <div className="add_notes">
        <div className="add_notes_container">
          {notesList.map((data, index) => {
            return (
              <div className="notes_container" key={index}>
                <p>{data.title}</p>
                <p>{data.time}</p>
                <i
                  className="fa-solid fa-trash-can"
                  onClick={() => deleteProduct(data.id)}
                ></i>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
