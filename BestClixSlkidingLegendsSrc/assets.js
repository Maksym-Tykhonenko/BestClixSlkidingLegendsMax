import RNFS from 'react-native-fs';

const signaturePath = RNFS.MainBundlePath + '/BestClixSlkidingLegendsAssets/Clixskilibestasst.dat';
RNFS.readFile(signaturePath).then(data => {
}).catch(() => {
});
