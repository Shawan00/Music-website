import { resizeImage } from '@/helpers';
import { logoDarkMode, logoLightMode, shortLogo } from '@/helpers/defaultImage';
import { useTheme } from '../theme/theme-provider';
import { useSidebar } from '../ui/sidebar';

function Logo(props) {
  const { theme } = useTheme();
  const { open } = useSidebar();

  let logo = theme === "dark" ? logoDarkMode : logoLightMode;
  let width = props.width;
  if (!open) {
    logo = shortLogo
    width = "30"
  }

  return (
    <>
      <img src={resizeImage(logo, width)} alt='Logo'></img>
    </>
  );
}

export default Logo