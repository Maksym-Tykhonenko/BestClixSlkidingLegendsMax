import ClistSlidendsChoose from './ClistSlidendsChoose';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sound from 'react-native-sound';

type WSDPSectionTitles =
    | 'Clix Slidinends Best First'
    | 'Play the best Level Game'
    | 'gallery'
    | 'achievements';
const { width: clixWidens, height: clixHeix } = Dimensions.get('window');

import {
    View as Beboxlix,
    Keyboard,
    SafeAreaView,
    TouchableWithoutFeedback as NoActionTap,
    Dimensions,
} from 'react-native';

import React, {
    useState as hookStatelix,
} from 'react';


import ClidingLebestGallery from './ClidingLebestGallery';

import AchivsOfClixSliding from './AchivsOfClixSliding';

import RadialGradientBg from '../BestClixSlkidingLegendsComponents/RadialGradientBg';


const MUSIC_KEY = 'soundOn';
const MUSIC_FILE = 'sports-football-soccer-music-main.mp3'; 

let music: Sound | null = null; // глобально для компонента

const SliWrapContaicliding: React.FC = () => {
    const [activebstlixsShow, setActivebstlixsShow] = hookStatelix<WSDPSectionTitles>('Clix Slidinends Best First');
    const [soundOn, setSoundOn] = hookStatelix<boolean | null>(null);

    // Ініціалізація soundOn та AsyncStorage
    React.useEffect(() => {
        (async () => {
            const s = await AsyncStorage.getItem(MUSIC_KEY);
            if (s === null) {
                await AsyncStorage.setItem(MUSIC_KEY, 'true');
                setSoundOn(true);
            } else {
                setSoundOn(s === 'true');
            }
        })();
    }, []);

    // Музика реагує на soundOn, але тільки якщо soundOn !== null
    React.useEffect(() => {
        // Якщо soundOn ще не визначено — нічого не робимо
        if (soundOn === null) return;

        // Завжди зупиняй і релізь попередній трек перед створенням нового
        if (music) {
            music.stop(() => {
                music?.release();
                music = null;
            });
        }

        if (soundOn) {
            Sound.setCategory('Playback');
            music = new Sound(MUSIC_FILE, Sound.MAIN_BUNDLE, (error) => {
                if (!error && music) {
                    music.setNumberOfLoops(-1);
                    music.play();
                }
            });
        }

        // При анмаунті компонента теж зупиняй і релізь
        return () => {
            if (music) {
                music.stop(() => {
                    music?.release();
                    music = null;
                });
            }
        };
    }, [soundOn]);

    const rendShowingScrcen = () => {
        switch (activebstlixsShow) {
            case 'Clix Slidinends Best First':
            case 'Play the best Level Game':
                return <ClistSlidendsChoose setActivebstlixsShow={setActivebstlixsShow} soundOn={soundOn} setSoundOn={setSoundOn} />;
            case 'achievements':
                return <AchivsOfClixSliding setActivebstlixsShow={setActivebstlixsShow} />;
            case 'gallery':
                return <ClidingLebestGallery setActivebstlixsShow={setActivebstlixsShow} />;
            default:
                return null;
        }
    };

    return (
        <Beboxlix style={{
            width: clixWidens,
            flex: 1,
            height: clixHeix,
        }}>
            <RadialGradientBg width={clixWidens} height={clixHeix} />
            <SafeAreaView />
            {rendShowingScrcen()}
        </Beboxlix>
    );
};

export default SliWrapContaicliding;
