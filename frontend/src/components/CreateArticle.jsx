import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateArticle() {

    const [name, setName] = useState("");
    const [category, setCategorie] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
    e.preventDefault(); 
    // Empêche le comportement par défaut du formulaire (rechargement de la page)

    axios.post("http://localhost:8081/create", {
        name,          // Envoie la variable 'name' dans le corps de la requête
        category,     // Envoie la variable 'categorie' dans le corps de la requête
        description    // Envoie la variable 'description' dans le corps de la requête
    })
    .then(res => {console.log("Article", res, "was created"); navigate("/")})
    
    // .then(()=> navigate("/"))
    // En cas de succès, affiche la réponse du serveur dans la console
    // navigate('/')  // Redirige vers la page d'accueil après la soumission du formulaire

    .catch(err => console.log(err))
    // En cas d'erreur, affiche l'erreur dans la console

    
    
}


  return (
    <div className='d-flex vh-100 bg-dark justify-content-center align-items-center'>
        <div className='w-50 bg-white shadow p3 rounded'>
            <form onSubmit={handleSubmit}>
                <h2>Ajouter un article</h2>
                <div className='mb-2'>
                    <label htmlFor='name'>Nom</label>
                    <input value={name} type="text" placeholder='Entrer le nom' className='form-control'
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor='categorie'>Categorie</label>
                    <input value={category} type="categorie" placeholder='Entrer la categorie' className='form-control'  onChange={(e) => setCategorie(e.target.value)} />
                </div>
                <div className='mb-2'>
                    <label htmlFor='description'>Description</label>
                    <input value={description} type="text" placeholder='Entrer la description' className='form-control'  onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button className='btn btn-success'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default CreateArticle
