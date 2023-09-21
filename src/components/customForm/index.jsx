import React, { memo, useState } from 'react';
import Form, { Field, List } from 'rc-field-form';

export default memo((props) => {

    const [aform] = Form.useForm();

    const [initData, setInitData] = useState({
        input: 'a',
        inputList: [{
            a: 'a',
            b: 'A'
        }, {
            a: 'b',
            b: 'B'
        }],
    });

    const handleFinish = (values) => {
        const data = aform.getFieldsValue();
        console.log("提交的值", values, data);
    }

    const handleReset = () => {
        setInitData({
            input: 'b',
            inputList: [],
        })
    }

    const handleFinishFail = (values, errorFields, outOfDate) => {
        console.log("提交失败", values, errorFields, outOfDate);
    }

    return (
        <div>
            <Form onFinish={handleFinish} initialValues={initData} form={aform} onFinishFailed={handleFinishFail}>
                <Field name='input' rules={[{ max: 2, required: true, message: '请输入正确的格式' }]}>
                    <input type="text" />
                </Field>
                <List name='inputList'>
                    {
                        (fields, { add, remove }) => {
                            return <>
                                {
                                    fields.map((item) => {
                                        return <div key={item.key}>
                                            <Field name={[item.name, 'a']} rules={[{ max: 1, required: true, message: 'a' }]}>
                                                <input type="text" />
                                            </Field>
                                            <Field name={[item.name, 'b']} rules={[{ max: 1, required: true, message: 'b' }]}>
                                                <input type="text" />
                                            </Field>
                                        </div>
                                    })
                                }
                                <div onClick={() => { add({ a: '' }) }}>添加</div>
                            </>
                        }
                    }
                </List>
                <button type='submit'>提交</button>
                <button type='reset' onClick={handleReset}>重置</button>
            </Form>
        </div>
    )
})