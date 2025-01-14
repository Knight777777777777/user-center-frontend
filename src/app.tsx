import type {Settings as LayoutSettings} from '@ant-design/pro-layout';
import {SettingDrawer} from '@ant-design/pro-layout';
import {PageLoading} from '@ant-design/pro-layout';
// @ts-ignore
import type {RunTimeLayoutConfig} from 'umi';
// @ts-ignore
import {history, Link} from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import {currentUser as queryCurrentUser} from './services/ant-design-pro/api';
import {BookOutlined, LinkOutlined} from '@ant-design/icons';
import defaultSettings from '../config/defaultSettings';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/Login';
/**
 * 无需用户登录态的页面
 */
const NO_NEED_LOGIN_WHITE_LIST = ['/user/Register', loginPath];
/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading/>,
};

// @ts-ignore
import {RequestConfig} from 'umi';

export const request: RequestConfig = {
  timeout: 10000,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      return await queryCurrentUser();
    } catch (error) {
      // history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (NO_NEED_LOGIN_WHITE_LIST.includes(history.location.pathname) ) {
    return {
      fetchUserInfo,
      settings: defaultSettings,
    };
  }
  const currentUser = await fetchUserInfo();
  return {currentUser, fetchUserInfo, settings: defaultSettings,};
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
// @ts-ignore
export const layout: RunTimeLayoutConfig = ({initialState, setInitialState}) => {
  return {
    rightContentRender: () => <RightContent/>,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.userName,
    },
    footerRender: () => <Footer/>,
    onPageChange: () => {
      const {location} = history;

      if (NO_NEED_LOGIN_WHITE_LIST.includes(location.pathname)) {
        return;
      }
      // 如果没有登录，重定向到 Login
      // if (!initialState?.currentUser) {
      //   history.push(loginPath);
      // }
    },
    links: isDev
      ? [
        <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
          <LinkOutlined/>
          <span>OpenAPI 文档</span>
        </Link>,
        <Link to="/~docs" key="docs">
          <BookOutlined/>
          <span>业务组件文档</span>
        </Link>,
      ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children: any, props: { location: { pathname: string | string[]; }; }) => {
      if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/Login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState: any) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
