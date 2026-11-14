import { useState } from 'react';
import { useStore } from '../../store/store.js';
import { useActions } from '../../hooks/useEngine.js';
import { useT, useLang, trTarget } from '../../i18n/index.js';
import { DESTINATIONS } from '../../config/destinations.js';
import { CELESTIAL } from '../../config/celestial.js';
import { IconClose, IconChevron } from '../HUD/icons.jsx';
import SisterLink from '../Links/SisterLink.jsx';

const GROUPS = [['solar', 'SOLAR SYSTEM'], ['beyond', 'BEYOND']];

/** Facts for the flight brief: the real figures of the body a destination is named after. */
export function DestinationBrief({ dest, onEngage, disabled, here }) {
  const t = useT();
  const lang = useLang();
  const body = dest.kind === 'body' && CELESTIAL[dest.poi] ? trTarget({ id: dest.poi, ...CELESTIAL[dest.poi] }, lang) : null;
  return (
    <div className="nav__brief">
      <h3>{t(dest.name)}{dest.fictional && <span className="tag">{t('FICTIONAL')}</span>}</h3>
      {body && <p className="target__type">{body.type}</p>}
      {body && (
        <dl className="target__facts">
          {body.facts.slice(0, 4).map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
        </dl>
      )}
      <p>{t(dest.blurb)}</p>
      <button className="btn btn--primary" disabled={disabled || here} onClick={onEngage}>
        {t(here ? 'HOLDING POSITION' : 'ENGAGE NAVIGATION')}
      </button>
    </div>
  );
}

export default function NavigationPanel() {
  const actions = useActions();
  const t = useT();
  const open = useStore((s) => s.navOpen);
  const selected = useStore((s) => s.navSelected);
  const sectorId = useStore((s) => s.sectorId);
  const travel = useStore((s) => s.travel);
  const sel = DESTINATIONS.find((d) => d.id === selected);
  const [group, setGroup] = useState('solar');
  if (!open) return null;
  const shown = sel && sel.group !== group ? sel.group : group;
  const list = DESTINATIONS.filter((d) => d.group === shown);
  return (
    <aside className="panel nav" aria-label={t('Navigation')}>
      <div className="panel__head">
        <h2>{t('NAVIGATION')}</h2>
        <button className="icon-btn" onClick={actions.toggleNav} aria-label={t('Collapse navigation')}><IconClose /></button>
      </div>
      <div className="nav__tabs" role="tablist">
        {GROUPS.map(([id, label]) => (
          <button key={id} role="tab" aria-selected={shown === id} className={shown === id ? 'is-on' : ''} onClick={() => { setGroup(id); if (sel && sel.group !== id) actions.selectDestination(null); }}>{t(label)}</button>
        ))}
        <button onClick={() => actions.togglePanel('map')}>{t('MAP')}</button>
      </div>
      <ul className="nav__list">
        {list.map((d, i) => {
          const current = d.id === sectorId;
          return (
            <li key={d.id}>
              <button
                className={`nav__item${selected === d.id ? ' is-selected' : ''}${current ? ' is-current' : ''}`}
                onClick={() => actions.selectDestination(d.id)} onMouseEnter={actions.uiHover} aria-pressed={selected === d.id}
              >
                <span className="nav__idx">{String(i + 1).padStart(2, '0')}</span>
                <span className="nav__name">{t(d.name)}</span>
                <small>{t(d.sector)}</small>
                {current ? <em>{t('HERE')}</em> : <IconChevron />}
              </button>
            </li>
          );
        })}
      </ul>
      {sel && <DestinationBrief dest={sel} disabled={!!travel} here={sel.id === sectorId} onEngage={() => actions.engage(sel.id)} />}
      {!sel && <p className="fine nav__hint">{t('Select a destination to see the flight brief.')}</p>}
      <SisterLink variant="nav" />
    </aside>
  );
}
