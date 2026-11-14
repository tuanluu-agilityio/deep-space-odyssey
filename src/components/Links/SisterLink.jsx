import { useT } from '../../i18n/index.js';
import { IconExternal } from '../HUD/icons.jsx';

// Tuan's companion project. One place to change the address if it ever moves.
export const SISTER_URL = 'https://explore-solarsystem.netlify.app/';

/** Link to the companion site. `variant` is 'intro' (one line under the start button) or 'nav' (a relay card in the navigation panel). */
export default function SisterLink({ variant = 'nav' }) {
  const t = useT();
  if (variant === 'intro') {
    return (
      <a className="sister sister--intro" href={SISTER_URL} target="_blank" rel="noopener">
        {t('Also from this crew:')} <strong>EXPLORE SOLAR SYSTEM</strong> <IconExternal />
      </a>
    );
  }
  return (
    <a className="sister sister--nav" href={SISTER_URL} target="_blank" rel="noopener" title={t('Another Solar System journey by the same crew · opens in a new tab')}>
      <small>{t('SISTER MISSION')}</small>
      <span className="sister__name">EXPLORE SOLAR SYSTEM <IconExternal /></span>
    </a>
  );
}
