
import "./button.css";

const Button = ({symbol, onClick}) => {
    return(
        <div class="button" onClick={onClick}>
            {symbol}
        </div>

    )
}

export default Button