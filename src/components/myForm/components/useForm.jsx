import {memo, useRef} from 'react';

class FormStore {
    constructor() {
        this.store = {};
    }
    getFieldsValue = () => {        /* 这里所有的函数使用箭头函数的原因是：this的指向问题 */
        return this.store;
    }
    getFieldValue = (fieldName) => {
        return this.store[fieldName];
    }
    setFieldsValue = (newStore) => {
        this.store = {
            ...this.store,
            ...newStore,
        }
    }
    setFieldValue = (fieldName, value) => {
        this.store[fieldName] = value;
    }
    onSubmit = (e) => {
        e.preventDefault();
        console.log("提交的数据", this.store);
    }
    getForm = () => {
        return {
            getFieldsValue: this.getFieldsValue,
            getFieldValue: this.getFieldValue,
            setFieldsValue: this.setFieldsValue,
            setFieldValue: this.setFieldValue,
            onSubmit: this.onSubmit,
        }
    }
}

const useForm = (form) => {
    const formRef = useRef();
    if (!formRef.current) {
        if (form) {
            formRef.current = form;
        } else {
            const formStore = new FormStore();
            formRef.current = formStore.getForm();
        }
    }
    return [formRef.current];
};


export default useForm;