import "./HeroesList.css";
import HeroesListItem from "../heroesListItem/HeroesListItem.jsx";
import Spinner from "../spinner/Spinner";
import { CSSTransition } from "react-transition-group";
import { useGetHeroesQuery } from "../../apis/heroesApi";
import { currentFilterSelector } from "../../selectors/currentFilterSelector";
import { useSelector } from "react-redux";
import { useCallback } from "react";

const HeroesList = () => {
  const { data: result = [], isLoading, isError } = useGetHeroesQuery();

  const currentFilter = useSelector(currentFilterSelector);

  const filteredHeroes = useCallback((arr, element) => {
    if (element === "all") return arr;

    return arr.filter(item => item.element === element)
    
}, [])

  if (isLoading) return <Spinner />;

  if (isError) return <h5 className="text-center mt-5">Ошибка загрузки</h5>;

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>;
    }

    return arr.map(({ id, ...props }) => {
      return (
        <CSSTransition
          mountOnEnter
          unmountOnExit
          key={id}
          timeout={500}
          classNames="hero"
          in={true}
          appear={true}
        >
          <HeroesListItem id={id} {...props} />
        </CSSTransition>
      );
    });
  };

  const elements = renderHeroesList(filteredHeroes(result, currentFilter));

  return <ul>{elements}</ul>;
};

export default HeroesList;
