import { memo, useEffect } from "react"; 
import FormContext from "./components/formContext";
import useForm from "./components/useForm";
import Item from "./components/formItem";
import List from "./components/formList";

const Form = memo((props) => {
    const {form, initValues, children, onSubmit=() => {}} = props;
    const [formInstance] = useForm(form);

    useEffect(() => {
        if (initValues) {
            formInstance.setInitialValues(initValues);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("提交的数据", formInstance.getFieldsValue());
        onSubmit(e, formInstance.getFieldsValue());
    };

    const handleReset = (e) => {
        e.preventDefault();
        formInstance.setInitialValues();
        console.log("重置的数据", formInstance.getFieldsValue());
    }

    return (
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <FormContext.Provider value={formInstance}>
                {
                    children
                }
            </FormContext.Provider>
        </form>
    )
});

Form.useForm = useForm;
Form.Item = Item;
Form.List = List;

export default Form;