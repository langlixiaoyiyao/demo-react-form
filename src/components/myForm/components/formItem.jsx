import React, {memo, useContext, useEffect, useState} from 'react';
import FormContext from './formContext';

const FormItem = memo((props) => {
    const {name, children} = props;
    const formContextData = useContext(FormContext);

    const [value, setValue] = useState(formContextData.getFieldValue(name));

    const handleChange = (e) => {
        formContextData.setFieldValue(name, e.target.value);
    };

    useEffect(() => {
        console.log("执行多少次？");
        if (value != formContextData.getFieldValue(name)) {
            setValue(formContextData.getFieldValue(name));
        }
    }, [formContextData.getFieldValue(name)])
    
    return React.cloneElement(children, {
        value: value,
        onChange: handleChange,
    })
});


export default FormItem;