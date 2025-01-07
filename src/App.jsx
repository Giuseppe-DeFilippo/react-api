import React, { useEffect, useState } from "react";
import FormComponent from "./components/FormComponents";
import CardComponent from "./components/CardComponents";
import axios from "axios"
function App() {
  const [articoli, setArticoli] = useState([]);


  //richiesta backedn

  useEffect(() => {
    axios.get('http://localhost:3000/api/post')  // Usa axios per fare una GET request
      .then((response) => {
        setArticoli(response.data.post);  // Imposta gli articoli dallo stato della risposta
      })
  }, []);


  const handleRemove = (index) => {
    const nuoviArticoli = articoli.filter((_, i) => i !== index);
    setArticoli(nuoviArticoli);
  };

  return (
    <div>
      <header>
        <h1>Gestione Articoli</h1>
      </header>
      <main>
        <FormComponent articoli={articoli} setArticoli={setArticoli} />
        <div className="card-list">
          {articoli.map((articolo, index) => (
            <CardComponent
              key={index}
              articolo={articolo}
              onRemove={() => handleRemove(index)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
