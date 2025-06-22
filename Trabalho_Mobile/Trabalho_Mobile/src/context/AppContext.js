import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
  const [resenhasCadastradas, setResenhasCadastradas] = useState([]);
  const [brazilianWritersCount, setBrazilianWritersCount] = useState(0);

  const [listaLivros, setListaLivros] = useState([]);

  const addReview = (newReview) => {
    setResenhasCadastradas(currentResenhas => [...currentResenhas, newReview]);
    if (newReview.isBrazilianWriter) {
      setBrazilianWritersCount(currentCount => currentCount + 1);
    }
  };

  const clearAllReviews = () => {
    setResenhasCadastradas([]);
    setBrazilianWritersCount(0);
  };

  const addBook = (newBook) => {
    setListaLivros(currentBooks => [...currentBooks, newBook]);
  };

  const clearBooks = () => {
    setListaLivros([]);
  };

  const contextValue = {
    resenhasCadastradas,
    brazilianWritersCount,
    listaLivros,
    addReview,
    clearAllReviews,
    addBook,
    clearBooks,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};