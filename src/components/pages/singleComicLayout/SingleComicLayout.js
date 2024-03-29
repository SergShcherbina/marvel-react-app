import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import './singleComicLayout.scss';

const SingleComicLayout = ({data}) => {
    const  {title, images, prices, description, pageCount, language}  = data;

    return(
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`${title} comics book`}
                />
                <title>{title}</title>
            </Helmet>
            <div className="single-comic">
                <img src={images} alt={title} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{pageCount}</p>
                    <p className="single-comic__descr">Language: {language}</p>
                    <div className="single-comic__price">{prices}</div>
                </div>
                <Link to="/comics" className="single-comic__back">Back to all comics</Link>
            </div>
        </>
        
    )
}

export default SingleComicLayout;