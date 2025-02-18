import classNames from 'classnames';
import { useRef, useState } from 'react';
import { ChromePicker } from 'react-color';

import { onKeyDownHandler } from '@/utils/a11y';

import Dropdown from '../Dropdown';

import styles from './index.module.scss';

type Props = {
  readonly name?: string;
  readonly value?: string;
  readonly onChange: (value: string) => void;
};

function ColorPicker({ name, onChange, value = '#000000' }: Props) {
  const anchorRef = useRef<HTMLSpanElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      tabIndex={0}
      role="button"
      className={classNames(styles.container, isOpen && styles.highlight)}
      onClick={() => {
        setIsOpen(true);
      }}
      onKeyDown={onKeyDownHandler(() => {
        setIsOpen(true);
      })}
    >
      <input hidden readOnly name={name} value={value} />
      <span ref={anchorRef} className={styles.brick} style={{ backgroundColor: value }} />
      <span>{value.toUpperCase()}</span>
      <Dropdown
        anchorRef={anchorRef}
        isOpen={isOpen}
        horizontalAlign="start"
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <ChromePicker
          color={value}
          onChange={({ hex }) => {
            onChange(hex);
          }}
        />
      </Dropdown>
    </div>
  );
}

export default ColorPicker;
