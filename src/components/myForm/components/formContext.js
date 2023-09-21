import { createContext } from "react";

const func = () => {

};

const FormContext = createContext({
    getFieldsValue: func,
    getFieldValue: func,
    setFieldsValue: func,
    setFieldValue: func,
});

export default FormContext;