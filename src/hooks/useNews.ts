import { useState, useEffect } from "react";
import { getNews, getCategories } from "../services/newsService";
import type { News } from "../types";

interface NewsFilters {
  categoria?: string;
  search?: string;
}

interface UseNewsResult {
  news: News[];
  categories: string[];
  loading: boolean;
  error: string | null;
}

export const useNews = (filters?: NewsFilters): UseNewsResult => {
  const [news, setNews] = useState<News[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargamos las categorías una sola vez al montar el componente
  // Fíjate que tiene su propio useEffect independiente
  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error cargando categorías", err));
  }, []); // Array vacío = solo se ejecuta una vez, como ngOnInit puro

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getNews(filters);
        setNews(response.data);
      } catch (err) {
        setError("Error al cargar las noticias");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [filters?.categoria, filters?.search]);

  return { news, categories, loading, error };
};
