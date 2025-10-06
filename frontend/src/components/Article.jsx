import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

function Article() {

    const [article, setArticle] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/') // Envoi d'une requête GET vers l'URL http://localhost:8081/
        .then(res => setArticle(res.data))  // En cas de succès, affiche la réponse dans la console
        .catch(err => console.log(err)); // En cas d'erreur, affiche l'erreur dans la console
    }, [])  // Le tableau vide [] signifie que cet effet ne s'exécute qu'une seule fois au montage du composant

    // (le retour JSX du composant n'est pas montré ici)

  return (
    <div className='d-flex vh-100 bg-dark justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded'>
            <Link to="/create" className='btn btn-success'>Ajouter</Link> 
            <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Categorie</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            article.map((data,i) => (
                                <tr key={i}>
                                    <td>{data.name}</td>
                                    <td>{data.category}</td>
                                    <td>{data.description}</td>
                                    <td>
                                        <button className='btn btn-primary'>Modifier</button>
                                        <button className='btn btn-danger'>Supprimer </button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
            </table>
        </div>
    </div>
  )
}

export default Article
