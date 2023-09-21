import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {message, Tabs} from 'antd';
import React, {useState} from 'react';
import {ProFormText, LoginForm} from '@ant-design/pro-form';
// @ts-ignore
import {history, useModel} from 'umi';
import Footer from '@/components/Footer';
import styles from './index.less';
import {register} from "@/services/ant-design-pro/api";


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
      const id = await register(values);
      if (id > 0) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        if (!history) return;
        const {query} = history.location;
        history.push({pathname: "user/login", query});
        return;
      } else {
        throw new Error(`register error id = ${id}`);
      }
    } catch (error) {
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
          </div>
        </LoginForm>
      </div>
      <Footer/>
    </div>
  )
    ;
};
export default Register;

// import type { FC } from 'react';
// import { useState, useEffect } from 'react';
// import { Form, Button, Col, Input, Popover, Progress, Row, Select, message } from 'antd';
// import type { Store } from 'antd/es/form/interface';
// import { Link, useRequest, history } from 'umi';
// import type { StateType } from './service';
// import { fakeRegister } from './service';
//
//
// const FormItem = Form.Item;
// // const { Option } = Select;
// // const InputGroup = Input.Group;
//
// const passwordStatusMap = {
//   ok: (
//     <div className={styles.success}>
//       <span>强度：强</span>
//     </div>
//   ),
//   pass: (
//     <div className={styles.warning}>
//       <span>强度：中</span>
//     </div>
//   ),
//   poor: (
//     <div className={styles.error}>
//       <span>强度：太短</span>
//     </div>
//   ),
// };
//
// const passwordProgressMap: {
//   ok: 'success';
//   pass: 'normal';
//   poor: 'exception';
// } = {
//   ok: 'success',
//   pass: 'normal',
//   poor: 'exception',
// };
//
// const Register: FC = () => {
//   // const [count, setCount]: [number, any] = useState(0);
//   const [visible, setVisible]: [boolean, any] = useState(false);
//   // const [prefix, setPrefix]: [string, any] = useState('86');
//   const [popover, setPopover]: [boolean, any] = useState(false);
//   const confirmDirty = false;
//   let interval: number | undefined;
//   const [form] = Form.useForm();
//
//   useEffect(
//     () => () => {
//       clearInterval(interval);
//     },
//     [interval],
//   );
//
//   // const onGetCaptcha = () => {
//   //   let counts = 59;
//   //   setCount(counts);
//   //   interval = window.setInterval(() => {
//   //     counts -= 1;
//   //     setCount(counts);
//   //     if (counts === 0) {
//   //       clearInterval(interval);
//   //     }
//   //   }, 1000);
//   // };
//
//   const getPasswordStatus = () => {
//     const value = form.getFieldValue('password');
//     if (value && value.length > 9) {
//       return 'ok';
//     }
//     if (value && value.length > 5) {
//       return 'pass';
//     }
//     return 'poor';
//   };
//
//   const { loading: submitting, run: register } = useRequest<{ data: StateType }>(fakeRegister, {
//     manual: true,
//     onSuccess: (data: { status: string; }, params: { email: any; }) => {
//       if (data.status === 'ok') {
//         message.success('注册成功！');
//         history.push({
//           pathname: '/user/Register-result',
//           state: {
//             account: params.email,
//           },
//         });
//       }
//     },
//   });
//   const onFinish = (values: Store) => {
//     register(values);
//   };
//
//   const checkConfirm = (_: any, value: string) => {
//     const promise = Promise;
//     if (value && value !== form.getFieldValue('password')) {
//       return promise.reject('两次输入的密码不匹配!');
//     }
//     return promise.resolve();
//   };
//
//   const checkPassword = (_: any, value: string) => {
//     const promise = Promise;
//     // 没有值的情况
//     if (!value) {
//       setVisible(!!value);
//       return promise.reject('请输入密码!');
//     }
//     // 有值的情况
//     if (!visible) {
//       setVisible(!!value);
//     }
//     setPopover(!popover);
//     if (value.length < 6) {
//       return promise.reject('');
//     }
//     if (value && confirmDirty) {
//       form.validateFields(['confirm']);
//     }
//     return promise.resolve();
//   };
//
//   // const changePrefix = (value: string) => {
//   //   setPrefix(value);
//   // };
//
//   const renderPasswordProgress = () => {
//     const value = form.getFieldValue('password');
//     const passwordStatus = getPasswordStatus();
//     return value && value.length ? (
//       <div className={styles[`progress-${passwordStatus}`]}>
//         <Progress
//           status={passwordProgressMap[passwordStatus]}
//           className={styles.progress}
//           strokeWidth={6}
//           percent={value.length * 10 > 100 ? 100 : value.length * 10}
//           showInfo={false}
//         />
//       </div>
//     ) : null;
//   };
//
//   return (
//     <div className={styles.main}>
//
//       <Form form={form} name="UserRegister" onFinish={onFinish}>
//         <FormItem
//           name="mail"
//           rules={[
//             {
//               required: true,
//               message: '请输入邮箱地址!',
//             },
//             {
//               type: 'email',
//               message: '邮箱地址格式错误!',
//             },
//           ]}
//         >
//           <Input size="large" placeholder="邮箱" />
//         </FormItem>
//         <Popover
//           getPopupContainer={(node) => {
//             if (node && node.parentNode) {
//               return node.parentNode as HTMLElement;
//             }
//             return node;
//           }}
//           content={
//             visible && (
//               <div style={{ padding: '4px 0' }}>
//                 {passwordStatusMap[getPasswordStatus()]}
//                 {renderPasswordProgress()}
//                 <div style={{ marginTop: 10 }}>
//                   <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
//                 </div>
//               </div>
//             )
//           }
//           overlayStyle={{ width: 240 }}
//           placement="right"
//           visible={visible}
//         >
//           <FormItem
//             name="password"
//             className={
//               form.getFieldValue('password') &&
//               form.getFieldValue('password').length > 0 &&
//               styles.password
//             }
//             rules={[
//               {
//                 validator: checkPassword,
//               },
//             ]}
//           >
//             <Input size="large" type="password" placeholder="至少6位密码，区分大小写" />
//           </FormItem>
//         </Popover>
//         <FormItem
//           name="confirm"
//           rules={[
//             {
//               required: true,
//               message: '确认密码',
//             },
//             {
//               validator: checkConfirm,
//             },
//           ]}
//         >
//           <Input size="large" type="password" placeholder="确认密码" />
//         </FormItem>
//         {/*手机验证码*/}
//         {/*<InputGroup compact>*/}
//         {/*  <Select size="large" value={prefix} onChange={changePrefix} style={{ width: '20%' }}>*/}
//         {/*    <Option value="86">+86</Option>*/}
//         {/*    <Option value="87">+87</Option>*/}
//         {/*  </Select>*/}
//         {/*  <FormItem*/}
//         {/*    style={{ width: '80%' }}*/}
//         {/*    name="mobile"*/}
//         {/*    rules={[*/}
//         {/*      {*/}
//         {/*        required: true,*/}
//         {/*        message: '请输入手机号!',*/}
//         {/*      },*/}
//         {/*      {*/}
//         {/*        pattern: /^\d{11}$/,*/}
//         {/*        message: '手机号格式错误!',*/}
//         {/*      },*/}
//         {/*    ]}*/}
//         {/*  >*/}
//         {/*    <Input size="large" placeholder="手机号" />*/}
//         {/*  </FormItem>*/}
//         {/*</InputGroup>*/}
//         {/*<Row gutter={8}>*/}
//         {/*  <Col span={16}>*/}
//         {/*    <FormItem*/}
//         {/*      name="captcha"*/}
//         {/*      rules={[*/}
//         {/*        {*/}
//         {/*          required: true,*/}
//         {/*          message: '请输入验证码!',*/}
//         {/*        },*/}
//         {/*      ]}*/}
//         {/*    >*/}
//         {/*      <Input size="large" placeholder="验证码" />*/}
//         {/*    </FormItem>*/}
//         {/*  </Col>*/}
//         {/*  <Col span={8}>*/}
//         {/*    <Button*/}
//         {/*      size="large"*/}
//         {/*      disabled={!!count}*/}
//         {/*      className={styles.getCaptcha}*/}
//         {/*      onClick={onGetCaptcha}*/}
//         {/*    >*/}
//         {/*      {count ? `${count} s` : '获取验证码'}*/}
//         {/*    </Button>*/}
//         {/*  </Col>*/}
//         {/*</Row>*/}
//         <FormItem>
//           <Button
//             size="large"
//             loading={submitting}
//             className={styles.submit}
//             type="primary"
//             htmlType="submit"
//           >
//             <span>注册</span>
//           </Button>
//           <Link className={styles.register} to="/user/register">
//             <span>使用已有账号注册</span>
//           </Link>
//         </FormItem>
//       </Form>
//     </div>
//   );
// };
// export default Register;
