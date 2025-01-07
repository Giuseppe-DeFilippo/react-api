import React from "react";

function CardComponent({ articolo, onRemove }) {
    const { titolo, immagine, contenuto, categoria, tags, stato } = articolo;

    return (
        <div className="card mb-2" style={{ width: "18rem" }}>
            {immagine && (
                <img
                    src={immagine}
                    className="card-img-top"
                    alt={`Immagine di ${titolo}`}
                />
            )}
            <div className="card-body">
                <h5 className="card-title">{titolo}</h5>
                <p className="card-text">{contenuto}</p>
                <p className="card-text">
                    <strong>Categoria:</strong> {categoria}
                </p>
                <p className="card-text">
                    <strong>Tags:</strong>{" "}
                    {Object.keys(tags)
                        .filter((key) => tags[key])
                        .join(", ")}
                </p>
                <p className="card-text">
                    <strong>Stato:</strong> {stato ? "Pubblicato" : "Bozza"}
                </p>
                <button className="btn btn-danger btn-sm" onClick={onRemove}>
                    Elimina
                </button>
            </div>
        </div>
    );
}

export default CardComponent;
