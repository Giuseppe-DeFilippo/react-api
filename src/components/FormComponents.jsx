import axios from "axios";
import React, { useState } from "react";
function FormComponent({ articoli, setArticoli }) {
    const [formData, setFormData] = useState({
        titolo: "",
        immagine: "",
        contenuto: "",
        categoria: "",
        tags: [],
        email: "",
        stato: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked, } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleTagChange = (e) => {
        const { value, checked } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            tags: checked
                ? [...prevData.tags, value]
                : prevData.tags.filter((tag) => tag !== value),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:3000/api/post", formData)
            .then(() => {
                if (formData.titolo.trim()) {
                    setArticoli([...articoli, formData]);
                    setFormData({
                        titolo: "",
                        immagine: "",
                        contenuto: "",
                        categoria: "",
                        tags: [],
                        email: "",
                        stato: false,
                    });
                }

            })
    };
    // const handleDelete = (id) => {
    //     axios.delete(`http://localhost:3000/api/post/${id}`)
    //         .then((response) => {
    //             setArticoli(articoli.filter((articolo) => articolo._id !== id));
    //         })

    // }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="titolo"
                value={formData.titolo}
                onChange={handleChange}
                placeholder="Titolo"
                className="form-control mb-3"
            />

            <input
                type="text"
                name="immagine"
                value={formData.immagine}
                onChange={handleChange}
                placeholder="URL immagine"
                className="form-control mb-3"
            />
            {/* Aggiungi un controllo per visualizzare l'anteprima dell'immagine solo se è stata inserita un'immagine */}
            {/*inserire l url "copia indirizzo dell immagine"*/}
            {
                formData.immagine && (
                    <div className="mb-3">
                        <img
                            src={formData.immagine}
                            alt="Anteprima immagine"
                            className="img-fluid"
                            style={{ maxWidth: "100%", height: "auto" }}
                        />
                    </div>
                )
            }

            < input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="inserisci email"
                className="form-control mb-3"
            />
            <textarea
                name="contenuto"
                value={formData.contenuto}
                onChange={handleChange}
                placeholder="Contenuto"
                rows="4"
                className="form-control mb-3"
            />

            <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="form-select mb-3"
            >
                <option value="">Seleziona categoria</option>
                <option value="tecnologia">Tecnologia</option>
                <option value="sport">Sport</option>
                <option value="musica">Musica</option>
                <option value="film">film</option>
                <option value="serie tv">serie tv</option>
                <option value="anime">anime</option>

            </select>


            <div className="mb-3">
                {["tecnologia", "sport", "musica", "film", "serie tv", "anime"].map((tag) => (
                    <label key={tag} className="me-2">
                        <input
                            type="checkbox"
                            value={tag}
                            checked={formData.tags.includes(tag)}
                            onChange={handleTagChange}
                        />{" "}
                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </label>
                ))}
            </div>

            <div className="form-check mb-3">
                <input
                    type="checkbox"
                    name="stato"
                    checked={formData.stato}
                    onChange={handleChange}
                    className="form-check-input"
                />
                <label className="form-check-label">Pubblica articolo</label>
            </div>

            <button type="submit" className="btn btn-primary">
                Aggiungi
            </button>
        </form >
    );

}
export default FormComponent;
