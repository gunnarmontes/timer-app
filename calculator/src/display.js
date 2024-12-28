import './display.css';

const display = ({value}) => {
    return(
        <div class="display_body">
            <span class="content">
                {value}
            </span>
        </div>
        
    );
};

export default display