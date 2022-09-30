import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton'
import propTypes from 'prop-types';
import './charInfo.scss';
import { Link } from 'react-router-dom';
import FormSearch from '../form/FormSearch';

const CharInfo = (props) => {
    const {charId} = props;
    const [char, setChar] = useState(null);
    const {loading, error, getCharacter, clearError} = useMarvelService();

    const onCharLoded = (char) => {
        setChar(char);
    };    

    const updateChar = () => {
        if(!charId) return;                                        //если приходит null, то запрос не делаем
        clearError();

        getCharacter(charId)
            .then(res => {onCharLoded(res)})
    };

    useEffect(() => {
        updateChar();
    }, [charId]);

    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;             
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <>
            <div className="char__info">
                {errorMessage}
                {spinner}
                {content}
                {skeleton}
                <FormSearch/>  
            </div> 
        </>
    )    
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    const styleImgChar = thumbnail.includes('image_not_available') ? {objectFit: 'contain'} : null; 

    const renderList = () => {
        return (
            <ul className="char__comics-list"> 

                {comics.length > 0 ? null : 'There is no comics with this character'} 

                {comics.map((item, i) => {
                    if(i > 9) return;
                    
                    const idComicInfo = item.resourceURI.match(/\d{3,}/)[0]    //получаем id комикса из url адреса с сервера     
                    
                    return (
                        <Link to={`/comics/${idComicInfo}`} 
                        className="char__comics-item" key={i} >
                            <li>
                                {item.name}
                            </li>
                        </Link>
                    )  
                })}       
            </ul>
        )
    }    

    return <>
        <div className="char__basics">
                <img src={thumbnail} alt={name} style={styleImgChar} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
        </div>
        <div className="char__descr">
            {description}
        </div>
        <div className="char__comics">Comics:</div>    
        {renderList()}            
    </>
}

CharInfo.propTypes = {                                           //валидация пропсов элемента с помощью PropTypes
    charId: propTypes.number,                                    //указываем какой пропс: какой тип данный должен прийти
}

export default CharInfo;
