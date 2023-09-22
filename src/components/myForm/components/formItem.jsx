import React from 'react';
import FormContext from './formContext';

class FormItem extends React.Component {
    static contextType = FormContext;
    componentDidMount() {
        const { registerField } = this.context;
        this.unregisterField = registerField(this.props.name, this);
    }

    componentWillUnmount() {
        this.unregisterField();
    }

    handleChange = (e) => {
        this.context.setFieldValue(this.props.name, e.target.value);
    };

    onStoreChange = () => {
        this.forceUpdate();
    };

    render() {
        return <>
            {
                React.cloneElement(this.props.children, {
                    value: this.context.getFieldValue(this.props.name) || '',
                    onChange: this.handleChange,
                })
            }
            {
                this.context.getErrors()[this.props.name] && (
                    <div style={{color: 'red'}}>{this.context.getErrors()[this.props.name]}</div>
                )
            }
        </>
    }
}

export default FormItem;