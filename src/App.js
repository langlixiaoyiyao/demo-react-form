import React from 'react';
import MyForm from './components/myForm';
import './App.css';

function App() {

  const [form] = MyForm.useForm();

  const handleClick = () => {
    form.setFieldValue('input', 'xixii');
    console.log(form.getFieldsValue());
  }

  return (
    <div className="App">
        <MyForm form={form}>
          <MyForm.Item name='input'>
            <input />
          </MyForm.Item>
          <button type='submit'>提交</button>
          <div onClick={handleClick}>点击修改form</div>
        </MyForm>
    </div>
  );
}

export default App;
