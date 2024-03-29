
import ErrorMessage from "../errorMessage/ErrorMessage";
import {Component} from "react";


class ErrorBoundary extends Component {                             //классовай компонент отлавливающий ошибки

    state = {
        error: false
    };

    componentDidCatch(error, errorInfo) {                      //хук срабатывающий при ошибке
        debugger
        console.log(error, errorInfo);
        this.setState({error: true})
    };

    render () {
        if(this.state.error) {
            return <ErrorMessage/>
        }
        
        return this.props.children;
    }
}

export default ErrorBoundary;