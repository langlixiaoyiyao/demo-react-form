import {memo, useRef} from 'react';

/* 深拷贝的函数 */
const deepCopy = (obj) => {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    let result;
    if (obj instanceof Array) {
        result = [];
    } else {
        result = {};
    }
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = deepCopy(obj[key]);
        }
    }
    return result;
}

class FormStore {
    constructor() {
        this.store = {};
        this.fieldEntities = {};
        this.initValues = {};
        this.errors = {};
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
        };
        Object.keys(newStore).forEach((fieldName) => {
            const errorMessage = this.validateField(fieldName, newStore[fieldName]);
            this.errors[fieldName] = errorMessage;
            this.fieldEntities[fieldName].onStoreChange();
        });
    }
    setFieldValue = (fieldName, value) => {
        this.store[fieldName] = value;
        const errorMessage = this.validateField(fieldName, value);
        this.errors[fieldName] = errorMessage;
        console.log("this.fieldEntities", this.errors);
        this.fieldEntities[fieldName].onStoreChange();
    }
    onSubmit = (e) => {
        e.preventDefault();
        console.log("提交的数据", this.store);
    }
    registerField = (name, entity) => { 
        this.fieldEntities[name] = entity;
        return () => {
            delete this.store[name];
            delete this.fieldEntities[name];
        }
    }
    setInitialValues = (initValues=this.initValues) => {
        this.initValues = deepCopy(initValues);
        this.setFieldsValue(deepCopy(initValues));
    }
    validateField = (name, value) => {
        const rules = this.fieldEntities[name].props.rules || [];
        
        let returnValue = '';
        for(let i = 0; i <rules.length; i++) {
            const rule = rules[i];
            if (rule.required && (value === undefined || value === "")) {
                console.log("rule");
                returnValue = rule.message || '必填项';
                break;
            } else if (rule.pattern && !rule.pattern.test(value)) {
                returnValue = rule.message || '格式不正确';
                break;
            }
        }
        return returnValue;
    }
    getErrors = () => {
        return this.errors;
    }
    getForm = () => {
        return {
            getFieldsValue: this.getFieldsValue,
            getFieldValue: this.getFieldValue,
            setFieldsValue: this.setFieldsValue,
            setFieldValue: this.setFieldValue,
            registerField: this.registerField,
            setInitialValues: this.setInitialValues,
            getErrors: this.getErrors,
        }
    }
}

/* 这里的useForm函数是一个自定义的hook，用于获取form实例 */
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