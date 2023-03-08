import { Link } from 'components/Link';
import { Text } from 'components/Text';
import { classes } from 'utils/style';
import styles from './Footer.module.css';

export const Footer = ({ className }) => (
  <footer className={classes(styles.footer, className)}>
    <Text size="s" align="center">
      <span className={styles.date}>
        {`© ${new Date().getFullYear()} Sudhanshu Samal`}
      </span>
      <Link href="https://www.fiverr.com/s2/87f2da4876"> Hire Me → </Link>
    </Text>
  </footer>
);
