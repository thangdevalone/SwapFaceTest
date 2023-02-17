import { Button, Form, Image, notification, Spin, Upload } from 'antd';
import { useState } from 'react';
import uploadApi from './api/uploadApi';
import { UploadOutlined } from '@ant-design/icons';
import './App.css';
const config = {
  beforeUpload: () => {
    return false;
  },

}
function App() {
  const [avatar1, setAvatar1] = useState(null)
  const [avatar2, setAvatar2] = useState(null)


  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [rs,setRs]=useState(null);
  const normFile = (e) => {
    setAvatar1(e?.fileList)
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;

  };
  const normFile2 = (e) => {
    setAvatar2(e?.fileList)
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;

  };
  const onFinish = async (values) => {
    try {
      setLoading(true);

      const result={
        "face1":avatar1[0].thumbUrl.split(',')[1],
        "face2":avatar2[0].thumbUrl.split(',')[1],
      }
      

      const response = await uploadApi.upload(result)
      setRs(response)
      setLoading(false)
    } catch (err) {

      setLoading(false)
    }
    //post ,..

  };
  const onFinishFailed = (err) => {



    console.log(err)
  };
  return (
    <div className="App">
      <Spin spinning={loading} delay={200}>
        {contextHolder}
        <header className="App-header">
          <h1>
            Thử đổi khuôn mặt
          </h1>
          <div className='container'>
            <Form
              name="basic"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="avatar1"
                label="Ảnh 1"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[
                  {
                    required: true,
                    message: 'Hãy tải lên ảnh !',
                  },
                ]}
              >

                <Upload maxCount={1} accept="image/png, image/jpeg,image/jpg" listType="picture"  {...config}>
                  <Button icon={<UploadOutlined />}>
                    Click to upload</Button>

                </Upload>
              </Form.Item>
              <Form.Item
                name="avatar2"
                label="Ảnh 2"
                valuePropName="fileList"
                getValueFromEvent={normFile2}
                rules={[
                  {
                    required: true,
                    message: 'Hãy tải lên ảnh !',
                  },
                ]}
              >

                <Upload maxCount={1} accept="image/png, image/jpeg,image/jpg" listType="picture"  {...config}>
                  <Button icon={<UploadOutlined />}>
                    Click to upload</Button>

                </Upload>
              </Form.Item>
              <Form.Item>


                <Button type="primary" htmlType="submit">
                  Chuyển
                </Button>

              </Form.Item>
            </Form>
          </div>
          {rs&&<Image src={rs}/>}
        </header>
      </Spin>
    </div>
  );
}

export default App;
