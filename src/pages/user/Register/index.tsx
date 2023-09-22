import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {Divider, message, Space, Tabs} from 'antd';
import React, {useState} from 'react';
import {ProFormText, LoginForm} from '@ant-design/pro-form';
// @ts-ignore
import {history, useModel} from 'umi';
import Footer from '@/components/Footer';
import styles from './index.less';
import {register} from "@/services/ant-design-pro/api";
import {Link} from "@umijs/preset-dumi/lib/theme";


const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');


  //表单提交
  const handleSubmit = async (values: API.RegisterParams) => {
    const {userPassword, checkPassword} = values;
    //校验
    if (userPassword !== checkPassword) {
      message.error("两次输入密码不一致");
      return;
    }
    try {
      // 注册
      const result = await register(values);
      if (result.data > 0) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        if (!history) return;
        const {query} = history.location;
        history.push({pathname: "user/login", query});
        return;
      }
    } catch (error: any) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          submitter={{
            searchConfig: {
              submitText: "注册"
            }
          }}
          logo={<img alt="logo" src="/logo.svg"/>}
          title="用户中心账号注册"
          subTitle={'Ant Design'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'账号密码注册'}/>
          </Tabs>
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'请输入账号'}
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    type: "string",
                    message: '密码不能小于8',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'请确定密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    type: "string",
                    message: '密码不能小于8',
                  },
                ]}
              />
              <ProFormText
                name="planetCode"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'请输入星球编号'}
                rules={[
                  {
                    required: true,
                    message: '星球编号是必填项！',
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Space split={<Divider type="vertical" />}>
              <Link to="/user/login">登录</Link>
            </Space>
          </div>
        </LoginForm>
      </div>
      <Footer/>
    </div>
  )
    ;
};
export default Register;
