import {Platform} from 'react-native';
import NfcManager, {
  NfcTech
} from 'react-native-nfc-manager';
import {getOutlet} from 'reconnect.js';


function setBeforeTransceive(callback) {
  beforeTransceive = callback;
}

class ErrSuccess extends Error {}

const withAndroidPrompt = (fn) => {
  async function wrapper() {
    try {
      if (Platform.OS === 'android') {
        getOutlet('androidPrompt').update({
          visible: true,
          message: 'Veuillez scanner la carte NFC',
        });
      }

      const resp = await fn.apply(null, arguments);

      if (Platform.OS === 'android') {
        getOutlet('androidPrompt').update({
          visible: true,
          message: 'Completed',
        });
      }

      return resp;
    } catch (ex) {
      throw ex;
    } finally {
      if (Platform.OS === 'android') {
        setTimeout(() => {
          getOutlet('androidPrompt').update({
            visible: false,
          });
        }, 800);
      }
    }
  }

  return wrapper;
};


class NfcProxy {
  async init() {
    const supported = await NfcManager.isSupported();
    if (supported) {
      await NfcManager.start();
    }
    return supported;
  }

  async isEnabled() {
    return NfcManager.isEnabled();
  }

  async goToNfcSetting() {
    return NfcManager.goToNfcSetting();
  }

  readTag = withAndroidPrompt(async () => {
    let tag = null;

    try {
      await NfcManager.requestTechnology([NfcTech.Ndef]);

      tag = await NfcManager.getTag();
      tag.ndefStatus = await NfcManager.ndefHandler.getNdefStatus();

      if (Platform.OS === 'ios') {
        await NfcManager.setAlertMessageIOS('Success');
      }
    } catch (ex) {
      // for tag reading, we don't actually need to show any error
      console.log(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }

    return tag;
  });

}

export default new NfcProxy();
export {ErrSuccess, setBeforeTransceive};