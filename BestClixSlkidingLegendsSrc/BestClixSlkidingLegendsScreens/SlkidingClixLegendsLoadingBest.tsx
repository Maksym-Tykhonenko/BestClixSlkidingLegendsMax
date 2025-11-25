const INIT_BEACON_KEY = 'init-beacon-variant-119z';
import { SafeAreaView } from 'react-native-safe-area-context';
import RadialGradientBg from '../BestClixSlkidingLegendsComponents/RadialGradientBg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect as hookGlareSpiral } from 'react';
import CubesAnimLoar from '../BestClixSlkidingLegendsComponents/CubesAnimLoar';
import { useNavigation as navGlareSpiral } from '@react-navigation/native';
import {
    Dimensions as MetaScreenFlux,
    Image as ImgNovaShard,
    View as BoxDeltaNest,
} from 'react-native';

const SlkidingClixLegendsLoadingBest: React.FC = () => {
    const glideNavBeam = navGlareSpiral();
    const { width: glideSpanW, height: glideSpanH } = MetaScreenFlux.get('window');

    hookGlareSpiral(() => {
        const igniteFlow = async () => {
            try {
                const [firstBoot] = await Promise.all([
                    AsyncStorage.getItem(INIT_BEACON_KEY),
                ]);

                // Унікальна логіка: додатковий seed для затримки
                const uniqueSeed = Math.floor(Math.random() * 1000);

                if (!firstBoot) {
                    await AsyncStorage.setItem(INIT_BEACON_KEY, 'true');
                    setTimeout(() => {
                        glideNavBeam.replace('BestLegendsOnboardingSlkidingClix');
                    }, 7050 + uniqueSeed); // унікальний час
                    return;
                }

                // Додаємо перевірку на платформу для унікальності
                const isAndroid = !!(typeof navigator !== 'undefined' && navigator.product === 'ReactNative' && navigator.userAgent && navigator.userAgent.includes('Android'));
                const shiftDelay = isAndroid
                    ? 4200 + uniqueSeed
                    : 4700 + Math.floor(Math.random() * 350);

                setTimeout(() => {
                    glideNavBeam.replace('SliWrapContaicliding');
                }, shiftDelay);

            } catch (err) {
                if (__DEV__) console.warn('GLIDE:ErrPipe', err);
                // Унікальна затримка для помилки
                const recDelay = 6100 + Math.floor(Math.random() * 1200);
                setTimeout(() => {
                    glideNavBeam.replace('SliWrapContaicliding');
                }, recDelay);
            }
        };

        igniteFlow();
    }, [glideNavBeam, glideSpanW]);

    return (
        <SafeAreaView
            style={{
                width: glideSpanW,
                flex: 1,
                alignItems: 'center',
                height: glideSpanH,
                backgroundColor: '#110E1B',
            }}
        >
            <RadialGradientBg width={glideSpanW} height={glideSpanH} />

            <ImgNovaShard
                style={{
                    resizeMode: 'contain',
                    height: glideSpanH * 0.24,
                    width: glideSpanW * 0.77,
                }}
                source={require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/bestClixTitle.png')}
            />

            <ImgNovaShard
                style={{
                    resizeMode: 'contain',
                    height: glideSpanW * 0.84,
                    width: glideSpanW * 0.84,
                }}
                source={require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/shootingFootballPlayer.png')}
            />

            <BoxDeltaNest
                style={{
                    bottom: -glideSpanH * 0.1,
                    zIndex: 10,
                    alignSelf: 'center',
                    position: 'absolute',
                }}
            >
                <CubesAnimLoar />
            </BoxDeltaNest>
        </SafeAreaView>
    );
};

export default SlkidingClixLegendsLoadingBest;
