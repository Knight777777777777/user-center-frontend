import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';
const Footer: React.FC = () => {
  const defaultMessage = 'lccccccc';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[

        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/Knight777777777777',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
