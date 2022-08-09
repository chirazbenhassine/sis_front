const TNF_MAP = {
  EMPTY: 0x0,
  WELL_KNOWN: 0x01,
  MIME_MEDIA: 0x02,
  ABSOLUTE_URI: 0x03,
  EXTERNAL_TYPE: 0x04,
  UNKNOWN: 0x05,
  UNCHANGED: 0x06,
  RESERVED: 0x07,
};

const RTD_MAP = {
  TEXT: 'T', // [0x54]
  URI: 'U', // [0x55]
  SMART_POSTER: 'Sp', // [0x53, 0x70]
  ALTERNATIVE_CARRIER: 'ac', //[0x61, 0x63]
  HANDOVER_CARRIER: 'Hc', // [0x48, 0x63]
  HANDOVER_REQUEST: 'Hr', // [0x48, 0x72]
  HANDOVER_SELECT: 'Hs', // [0x48, 0x73]
};

export const rtdValueToName = (value) => {
    value = value.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    for (let name in RTD_MAP) {
      if (value === RTD_MAP[name]) {
        return name;
      }
    }
    return null;
}

export const tnfValueToName = (value) => {
    for (let name in TNF_MAP) {
      if (value === TNF_MAP[name]) {
        return name;
      }
    }
    return null;
}

export const renderPayload = (Ndef,ndefData) => {
  // const tnfName = tnfValueToName(ndef.tnf);
  const rtdName = rtdValueToName(ndefData.type);
  if (ndefData.tnf === Ndef.TNF_WELL_KNOWN) {
    if (rtdName === 'URI') {
      return Ndef.uri.decodePayload(ndefData.payload);
    } else if (rtdName === 'TEXT') {
      return Ndef.text.decodePayload(ndefData.payload);
    }
  } 
  return null;
};