import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Text as Letextens,
    View as Stlidvie,
    Image as BestImageEver,
    TouchableOpacity as ChangedTouch,
    Share,
    Dimensions as WidthAndHeight,
} from 'react-native';
import PlaybestLevelGme from './PlaybestLevelGme';

const LEVELS = [
    { key: 'easy', label: 'Easy' },
    { key: 'medium', label: 'Medium' },
    { key: 'hard', label: 'Hard' },
    { key: 'gallery', label: 'Gallery' },
    { key: 'achievements', label: 'Achievements' },
];

const BOTTOM_BUTTONS = [
    {
        key: 'sound',
        images: [
            require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/sounclOn.png'),
            require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/sounclOff.png'),
        ],
    },
    {
        key: 'share',
        images: [
            require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/legendsShare.png'),
        ],
    },
    {
        key: 'vibration',
        images: [
            require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/vibrlOn.png'),
            require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/vibrof.png'),
        ],
    },
];

const LOCK_IMG = require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/clixloc.png');

export default function ClistSlidendsChoose({ setActivebstlixsShow, soundOn, setSoundOn }: { setActivebstlixsShow: (section: string) => void, soundOn: boolean, setSoundOn: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { width: slidiwid, height: slidihei } = WidthAndHeight.get('window');
    const [vibrationOn, setVibrationOn] = useState(true);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
    const [levelsOpen, setLevelsOpen] = useState<{ easy: boolean; medium: boolean; hard: boolean }>({ easy: true, medium: false, hard: false });

    useEffect(() => {
        (async () => {
            // Levels
            const storedLevels = await AsyncStorage.getItem('levelsOpen');
            if (storedLevels) {
                setLevelsOpen(JSON.parse(storedLevels));
            } else {
                await AsyncStorage.setItem('levelsOpen', JSON.stringify({ easy: true, medium: false, hard: false }));
            }
            // Sound
            const s = await AsyncStorage.getItem('soundOn');
            setSoundOn(s === null ? true : s === 'true');
            // Vibration
            const v = await AsyncStorage.getItem('vibrationOn');
            setVibrationOn(v === null ? true : v === 'true');
        })();
    }, [selectedDifficulty]);

    const handleBottomPress = async (key: string) => {
        if (key === 'sound') {
            const newVal = !soundOn;
            setSoundOn(newVal);
            await AsyncStorage.setItem('soundOn', newVal ? 'true' : 'false');
        } else if (key === 'vibration') {
            const newVal = !vibrationOn;
            setVibrationOn(newVal);
            await AsyncStorage.setItem('vibrationOn', newVal ? 'true' : 'false');
        } else if (key === 'share') {
            Share.share({ message: `Do you like sliding puzzles? Try BestClix Sliding Legends!` });
        }
    };

    const getLevelButton = (level: typeof LEVELS[0], idx: number) => {
        const isLocked = (level.key === 'medium' && !levelsOpen.medium) || (level.key === 'hard' && !levelsOpen.hard);
        const isYellow = ['easy', 'gallery', 'achievements'].includes(level.key);
        const isLevel = ['easy', 'medium', 'hard'].includes(level.key);

        return (
            <ChangedTouch
                key={level.key}
                activeOpacity={isLocked ? 1 : 0.7}
                disabled={isLocked}
                onPress={() => {
                    if (isLevel && !isLocked) setSelectedDifficulty(level.key);
                    if (level.key === 'gallery' || level.key === 'achievements') setActivebstlixsShow(level.key);
                }}
                style={{
                    backgroundColor: isYellow ? '#FCCE03' : '#FCCE03',
                    alignSelf: 'center',
                    height: slidihei * 0.07,
                    alignItems: 'center',
                    width: slidiwid * 0.8,
                    justifyContent: 'center',
                    marginTop: idx === 0 ? slidihei * 0.04 : slidihei * 0.018,
                    flexDirection: 'row',
                    borderRadius: slidihei * 0.06,
                    opacity: isLocked ? 0.5 : 1,
                }}
            >
                {isLevel && isLocked &&
                    <BestImageEver source={LOCK_IMG} style={{
                        marginRight: slidiwid * 0.02,
                        height: slidiwid * 0.06,
                        resizeMode: 'contain',
                        width: slidiwid * 0.06,
                    }}
                    />
                }
                <Letextens style={{
                    fontSize: slidihei * 0.032,
                    width: isLevel && isLocked ? slidiwid * 0.4 : '100%',
                    color: '#120000',
                    fontWeight: 'bold',
                    letterSpacing: 0.5,
                    textAlign: 'center',
                }}
                >
                    {level.label}
                </Letextens>
                {isLevel && isLocked &&
                    <BestImageEver
                        source={LOCK_IMG}
                        style={{
                            marginLeft: slidiwid * 0.02,
                            width: slidiwid * 0.06,
                            resizeMode: 'contain',
                            height: slidiwid * 0.06,
                        }}
                    />
                }
            </ChangedTouch>
        );
    };

    if (selectedDifficulty) {
        return (
            <PlaybestLevelGme
                difficulty={selectedDifficulty}
                setSelectedDifficulty={setSelectedDifficulty}
                setActivebstlixsShow={setActivebstlixsShow}
            />
        );
    }

    return (
        <Stlidvie style={{ flex: 1 }}>
            <BestImageEver
                style={{
                    alignSelf: 'center',
                    marginTop: slidihei * 0.06,
                    height: slidihei * 0.14,
                    resizeMode: 'contain',
                    width: slidiwid * 0.75,
                }}
                source={require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/bestClixTitle.png')}
            />
            {/* Buttons */}
            <Stlidvie style={{ marginTop: slidihei * 0.01 }}>
                {LEVELS.map(getLevelButton)}
            </Stlidvie>
            {/* Bottom buttons */}
            <Stlidvie
                style={{
                    width: slidiwid,
                    flexDirection: 'row',
                    bottom: slidihei * 0.1,
                    alignItems: 'center',
                    position: 'absolute',
                    justifyContent: 'space-evenly',
                }}
            >
                {BOTTOM_BUTTONS.map((btn, idx) => {
                    let imgSrc;
                    if (btn.key === 'sound') imgSrc = btn.images[soundOn ? 0 : 1];
                    else if (btn.key === 'vibration') imgSrc = btn.images[vibrationOn ? 0 : 1];
                    else imgSrc = btn.images[0];
                    return (
                        <ChangedTouch
                            activeOpacity={0.7}
                            onPress={() => handleBottomPress(btn.key)}
                            key={btn.key}
                            style={{
                                justifyContent: 'center',
                                width: slidiwid * 0.15,
                                alignItems: 'center',
                                borderRadius: slidiwid * 0.075,
                                height: slidiwid * 0.15,
                            }}
                        >
                            <BestImageEver source={imgSrc} style={{
                                    width: slidiwid * 0.15,
                                    height: slidiwid * 0.15,
                                    resizeMode: 'contain',
                                }}
                            />
                        </ChangedTouch>
                    );
                })}
            </Stlidvie>
        </Stlidvie>
    );
}