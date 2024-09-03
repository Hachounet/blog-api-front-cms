import { useState, useEffect } from 'react';

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Démarrer la requête
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parser la réponse en JSON
      })
      .then((data) => {
        setData(data); // Mettre à jour l'état avec les données reçues
        setLoading(false); // Arrêter le chargement
      })
      .catch((error) => {
        setError(error); // Gérer les erreurs
        setLoading(false); // Arrêter le chargement
      });
  }, [url]); // Le hook se réexécute si l'URL change

  return { data, loading, error };
}
