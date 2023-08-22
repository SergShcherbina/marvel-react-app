import { useHttp } from "../components/hooks/useHttp";

/**
 * Кастомный хук для взаимодействия с API Marvel.
 * Предоставляет методы для получения данных о персонажах и комиксах из API Marvel.
 * Также предоставляет методы для управления ошибками и процессами запросов.
 * @returns {Object} Объект с методами для работы с API Marvel.
 */

const useMarvelService = () => {
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=e085346ae8f6005895c9c698543ab5ab';
    const _baseOffset = 140
    const {request, clearError, process, setProcess} = useHttp();                        //получаем из хука объект с методами
    
    const getAllCharacters = async (offset = _baseOffset) => {           //если аргумент не передается, то используем _baseOffset
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);                                       //или .map(item => this._transformCharacter(item))
    };

    const getCharacter = async(id) => {
        const res  = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0])
    };

    const searchCharacter = async(name) => {                                       //поиск персонажа по имени
        const res  = await request(`${_apiBase}characters?nameStartsWith=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    };

    const _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items,
        }
    };
    
    const getAllComics = async (offset = 2) => {           
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_trensformComics);      
    };

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _trensformComics(res.data.results[0]);
    }

    const _trensformComics = (comics) => {
        return {
            title: comics.title,
            images: comics.thumbnail.path+ '.' + comics.thumbnail.extension,
            id: comics.id,
            prices: comics.prices[0].price,
            usl: comics.resourceURI,
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            description: comics.description || 'There is no description',
            language: comics.textObjects.language || 'en-us',
        }
    };

    return {getAllCharacters, 
            getCharacter, 
            clearError, 
            getAllComics, 
            getComic, 
            searchCharacter, 
            process, 
            setProcess};
};

export default useMarvelService;