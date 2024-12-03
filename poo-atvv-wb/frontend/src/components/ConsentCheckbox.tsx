import React from 'react';

type ConsentCheckboxProps = {
  consent: boolean;
  setConsent: (value: boolean) => void;
};

const ConsentCheckbox: React.FC<ConsentCheckboxProps> = ({ consent, setConsent }) => (
  <label>
    <input type="checkbox" checked={consent} onChange={() => setConsent(!consent)} />
    Aceito a coleta de dados conforme LGPD
  </label>
);

export default ConsentCheckbox;
