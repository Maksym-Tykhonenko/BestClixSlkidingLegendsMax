import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    TouchableOpacity as Legetach,
    Dimensions as CliskiDimsegends,
    Image as Skidimg,
    View as Veleview,
    Text as Dingtext,
} from 'react-native';
import React, { useEffect, useState } from 'react';

const ACHIEVEMENTS = [
    {
        key: 'easy_complete',
        label: 'Easy Complete',
        img: require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/ach_easy_complete.png'),
    },
    {
        key: 'medium_complete',
        label: 'Medium Complete',
        img: require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/ach_medium_complete.png'),
    },
    {
        key: 'hard_complete',
        label: 'Hard Complete',
        img: require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/ach_hard_complete.png'),
    },
    {
        key: 'easy_under_1min',
        label: 'Easy Done within 1min',
        img: require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/ach_easy_under_1min.png'),
    },
    {
        key: 'medium_under_3min',
        label: 'Medium Done within 3min',
        img: require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/ach_medium_under_3min.png'),
    },
    {
        key: 'hard_under_3min',
        label: 'Hard Done within 3min',
        img: require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/ach_hard_under_3min.png'),
    },
];

const HOME_IMG = require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/goMackclix.png');

export default function AchivsOfClixSliding({
    setActivebstlixsShow,
}: {
    setActivebstlixsShow: (section: string) => void,
}) {
    const { width: skixwit, height: skixheig } = CliskiDimsegends.get('window');
    const [achievements, setAchievements] = useState<string[]>([]);

    useEffect(() => {
        AsyncStorage.getItem('achievements').then(res => {
            setAchievements(res ? JSON.parse(res) : []);
        });
    }, []);

    return (
        <Veleview style={{ flex: 1 }}>
            <Dingtext
                style={{
                    fontWeight: 'bold',
                    fontSize: skixheig * 0.031,
                    letterSpacing: 0.5,
                    textAlign: 'center',
                    marginTop: skixheig * 0.01,
                    color: '#120000',
                }}
            >
                Achievements
            </Dingtext>
            <Veleview
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    marginTop: skixheig * 0.04,
                }}
            >
                {ACHIEVEMENTS.map((ach, idx) => (
                    <Veleview
                        key={ach.key}
                        style={{
                            marginBottom: skixheig * 0.04,
                            alignItems: 'center',
                            marginHorizontal: skixwit * 0.01,
                            width: skixwit * 0.4,
                        }}
                    >
                        <Skidimg
                            source={ach.img}
                            style={{
                                width: skixwit * 0.3,
                                height: skixheig * 0.11,
                                resizeMode: 'contain',
                                tintColor: achievements.includes(ach.key) ? undefined : '#161616',
                            }}
                        />
                        <Dingtext
                            style={{
                                fontSize: skixheig * 0.019,
                                color: '#120000',
                                textAlign: 'center',
                                marginTop: skixheig * 0.01,
                                fontStyle: 'italic',
                            }}
                        >
                            {ach.label}
                        </Dingtext>
                    </Veleview>
                ))}
            </Veleview>
            <Legetach
                onPress={() => setActivebstlixsShow('Clix Slidinends Best First')}
                style={{
                    width: skixwit * 0.16,
                    alignSelf: 'center',
                    bottom: skixheig * 0.04,
                    alignItems: 'center',
                    position: 'absolute',
                    borderRadius: skixwit * 0.08,
                    height: skixwit * 0.16,
                    justifyContent: 'center',
                }}
            >
                <Skidimg
                    source={HOME_IMG}
                    style={{
                        width: skixwit * 0.16,
                        height: skixwit * 0.16,
                        resizeMode: 'contain',
                    }}
                />
            </Legetach>
        </Veleview>
    );
}