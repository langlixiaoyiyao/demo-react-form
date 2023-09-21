import React, {memo, useContext, useEffect, useState} from 'react';
import FormContext from './formContext';

const FormItem = memo((props) => {
    const {name, children} = props;
    const formContextData = useContext(FormContext);

    const [value, setValue] = useState(formContextData.getFieldValue(name) || '');

    const handleChange = (e) => {
        formContextData.setFieldValue(name, e.target.value);
    };

    const onStoreChange = () => {
        setValue(formContextData.getFieldValue(name))
    };

    useEffect(() => {
        const unregisterField = formContextData.registerField(name, onStoreChange);
        return () => {
            unregisterField();
        }
    }, []);
    
    return React.cloneElement(children, {
        value: value,
        onChange: handleChange,
    })
});


export default FormItem;