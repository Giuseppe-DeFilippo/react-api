import React, { useState } from "react";

function FormComponent({ articoli, setArticoli }) {
    const [formData, setFormData] = useState({
        titolo: "",
        immagine: "",
        contenuto: "",
        categoria: "",
        tags: [],
        stato: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

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
        if (formData.titolo.trim()) {
            setArticoli([...articoli, formData]);
            setFormData({
                titolo: "",
                immagine: "",
                contenuto: "",
                categoria: "",
                tags: [],
                stato: false,
            });
        }
    };

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
            </select>

            <div className="mb-3">
                {["tecnologia", "sport", "musica"].map((tag) => (
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
        </form>
    );
}

export default FormComponent;
