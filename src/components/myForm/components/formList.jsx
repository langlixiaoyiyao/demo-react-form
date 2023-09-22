import {memo} from 'react';

const FormList = (props) => {
    const {name} = props;
    
    
    return (
        <div>
            {
                props.children
            }
        </div>
    )
};

export default memo(FormList);