import React, { useState as hookNovaState } from 'react';
const slides = [
    {
        main: 'Welcome to BestClix Sliding Legends',
        desc: 'Step into the game where every puzzle unlocks a moment of sports history. Slide, match, and reveal the legends behind the plays.',
        img: require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/clilegAstonbor/welcomeToBestSlid.png'),
    },
    {
        main: 'Slide to Reveal',
        desc: 'Move the puzzle pieces to uncover legendary moments. Each slide brings you closer to the story.',
        img: require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/clilegAstonbor/MoveTheTiles.png'),
    },
    {
        main: 'Match the Legends',
        desc: 'Test your skills by matching the right pieces. Discover the legends and their iconic plays.',
        img: require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/clilegAstonbor/BeatTheClock.png'),
    },
    {
        main: 'Unlock History',
        desc: 'Complete puzzles to unlock exclusive sports history and become a Sliding Legend!',
        img: require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/clilegAstonbor/UnlockTheLegends.png'),
    },
];
import { useNavigation as navOrbitSwitch } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PRIME_BOOTSIGN_SEAL = 'init-beacon-variant-119z';

import {
    Image as ImgGlyphCast,
    Text as TxtHaloCore,
    Pressable as TapFluxNode,
    useWindowDimensions as dimAuraView,
    View as BoxHaloShell,
} from 'react-native';

import RadialGradientBg from '../BestClixSlkidingLegendsComponents/RadialGradientBg';



const BestLegendsOnboardingSlkidingClix: React.FC = () => {
    const { width: clistingWih, height: clistingHet } = dimAuraView();
    const orbitNav = navOrbitSwitch();
    const [slideStage, setSlideStage] = hookNovaState(0);

    const stepNext = async () => {
        const endCapIndex = slides.length - 1;
        if (slideStage < endCapIndex) {
            setSlideStage(n => n + 1);
        } else {
            try {
                await AsyncStorage.setItem(PRIME_BOOTSIGN_SEAL, 'true');
            } catch (err) {
                if (__DEV__) console.warn('INIT:trackflow', err);
            }
            orbitNav.replace?.('SliWrapContaicliding');
        }
    };

    const activeSlide = slides[slideStage];

    return (
        <BoxHaloShell
            style={{
                alignItems: 'center',
                backgroundColor: 'transparent',
                width: clistingWih,
                flex: 1,
                justifyContent: 'center',
                height: clistingHet,
            }}
        >
            <RadialGradientBg width={clistingWih} height={clistingHet} />

            <ImgGlyphCast
                source={activeSlide.img}
                resizeMode="contain"
                style={{
                    marginTop: clistingHet * 0.085,
                    marginBottom: clistingHet * 0.039,
                    height: clistingHet * 0.30,
                    width: clistingWih * 0.72,
                }}
            />

            <BoxHaloShell
                style={{
                    shadowColor: '#000',
                    shadowOpacity: 0.08,
                    minHeight: clistingHet * 0.25,
                    alignItems: 'center',
                    backgroundColor: '#FCCE03',
                    justifyContent: 'center',
                    elevation: 2,
                    padding: clistingHet * 0.031,
                    borderRadius: 30,
                    shadowRadius: 8,
                    width: clistingWih * 0.9,
                }}
            >
                <TxtHaloCore
                    style={{
                        marginBottom: clistingHet * 0.014,
                        fontSize: clistingHet * 0.026,
                        textAlign: 'center',
                        color: '#222',
                        fontWeight: '800',
                    }}
                >
                    {activeSlide.main}
                </TxtHaloCore>

                <TxtHaloCore
                    style={{
                        textAlign: 'center',
                        fontSize: clistingHet * 0.019,
                        fontStyle: 'italic',
                        fontWeight: '500',
                        color: '#222',
                    }}
                >
                    {activeSlide.desc}
                </TxtHaloCore>
            </BoxHaloShell>

            <TapFluxNode
                onPress={stepNext}
                style={{
                    elevation: 2,
                    marginTop: clistingHet * 0.06,
                    shadowRadius: 8,
                    borderRadius: 999,
                    backgroundColor: '#F30014',
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: '#000',
                    height: clistingHet * 0.055,
                    shadowOpacity: 0.12,
                    width: clistingWih * 0.44,
                }}
            >
                <TxtHaloCore
                    style={{
                        letterSpacing: 0.5,
                        fontSize: clistingHet * 0.022,
                        fontWeight: '800',
                        color: '#fff',
                    }}
                >
                    {slideStage === slides.length - 1 ? 'Start' : 'Next'}
                </TxtHaloCore>
            </TapFluxNode>
        </BoxHaloShell>
    );
};

export default BestLegendsOnboardingSlkidingClix;