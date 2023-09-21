import { memo } from "react"; 
import FormContext from "./components/formContext";
import useForm from "./components/useForm";
import Item from "./components/formItem";
import List from "./components/formList";

const Form = memo((props) => {
    const {form, children} = props;
    const [formInstance] = useForm(form);

    return (
        <form onSubmit={formInstance.onSubmit}>
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