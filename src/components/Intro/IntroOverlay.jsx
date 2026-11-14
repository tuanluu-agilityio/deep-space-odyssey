import { useActions } from '../../hooks/useEngine.js';
import { useT } from '../../i18n/index.js';
import LanguageSwitch from '../Settings/LanguageSwitch.jsx';
import SisterLink from '../Links/SisterLink.jsx';

export default function IntroOverlay() {
  const actions = useActions();
  const t = useT();
  return (
    <div className="intro">
      <LanguageSwitch className="intro__lang" />
      <ul className="intro__status" aria-label={t('Ship status')}>
        <li>{t('EXPLORATION SYSTEM ONLINE')}</li>
        <li>{t('GALACTIC SECTOR: UNKNOWN')}</li>
        <li>{t('MISSION: INTERSTELLAR EXPLORATION')}</li>
      </ul>
      <div className="intro__center">
        <h1 className="intro__title">DEEP SPACE ODYSSEY</h1>
        <p className="intro__tag">{t('Beyond the stars. Beyond imagination.')}</p>
        <button className="intro__enter" onClick={actions.enter} autoFocus>
          <span>{t('ENTER THE UNIVERSE')}</span>
        </button>
        <p className="intro__note">{t('Sound begins when you enter · Best on a desktop with headphones')}</p>
        <SisterLink variant="intro" />
      </div>
    </div>
  );
}
