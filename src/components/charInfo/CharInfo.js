import './charInfo.scss';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelServices';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import setContent from '../../utils/setContent';
import closeIcon from '../../resources/img/close-icon.webp';


const CharInfo = (props) => {
    const {charId} = props;
    const [char, setChar] = useState(null);
    const {getCharacter, clearError, process, setProcess} = useMarvelService();
    const [isOpen, setIsOpen ] = useState(false);

    const onCharLoaded = (char) => {
        setChar(char);
    };    

    const updateChar = () => {
        if(!charId) return;                                                    //если приходит null, то запрос не делаем
        setIsOpen(true)
        clearError();
        getCharacter(charId)
            .then(res => {onCharLoaded(res)})
            .then(() => {
                setProcess('confirmed')                            //устанавливаем состояние после того как приходит результат
            })
    };

    useEffect(() => {
        updateChar();
    }, [charId]);

    const handleClick = () => {
        setIsOpen(false)
    }

    return (
        <div className={isOpen ? 'wrapperInfo' : null} onClick={handleClick}>
            <div className={ isOpen ? 'char__active char__info' : 'char__info'}>
                <img
                    src={closeIcon}
                    className='char__info-close'
                    alt={'close icon'}
                    onClick={handleClick}
                />
                {setContent(process, View, char)}
            </div>
        </div>
    )    
}

export const View = ({data}) => {                                            //переименовали так как из setContent возвр уже data вместо char
    const {name, description, thumbnail, homepage, wiki, comics} = data;
    const styleImgChar = thumbnail.includes('image_not_available') ? {objectFit: 'contain'} : null; 

    const renderList = () => {
        return (
            <ul className="char__comics-list"> 

                {comics.length > 0 ? null : 'There is no comics with this character'} 

                {comics.map((item, i) => {
                    
                    const idComicInfo = item.resourceURI.match(/\d{2,}/)[0]    //получаем id комикса из url адреса с сервера     
                    
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
