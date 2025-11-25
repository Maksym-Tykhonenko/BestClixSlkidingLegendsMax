import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    Text as Textic,
    View as BesViewing,
    Image as Imaginest,
    TouchableOpacity as PresopacitNds,
    Dimensions as Dimeclikidile,
} from 'react-native';

const HOME_IMG = require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/goMackclix.png');
const ARROW_LEFT_ACTIVE_IMG = require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/gallery_arrow_left.png');
const ARROW_LEFT_GRAY_IMG = require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/gallery_arrow_left_gray.png');
const ARROW_RIGHT_ACTIVE_IMG = require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/gallery_arrow_right.png');
const ARROW_RIGHT_GRAY_IMG = require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/gallery_arrow_right_gray.png');
const EMPTY_IMG = require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/gallery-is-empty.png');

const DIFFICULTY_COLORS: Record<string, { bg: string, text: string }> = {
    easy: { bg: '#FCCE03', text: '#120000' },
    medium: { bg: '#183153', text: '#fff' },
    hard: { bg: '#CD0011', text: '#fff' },
};

export default function ClidingLebestGallery({
    setActivebstlixsShow,
}: {
    setActivebstlixsShow: (section: string) => void,
}) {
    const { width: skixwit, height: skixheig } = Dimeclikidile.get('window');
    const [gallery, setGallery] = useState<any[]>([]);
    const [currentIdx, setCurrentIdx] = useState(0);

    useEffect(() => {
        AsyncStorage.getItem('gallery').then(res => {
            setGallery(res ? JSON.parse(res) : []);
        });
    }, []);

    const current = gallery[currentIdx];
    let difficulty = '';
    if (current && current.key) {
        difficulty = current.key.split('_')[0];
    }
    const colors = DIFFICULTY_COLORS[difficulty] || DIFFICULTY_COLORS.easy;

    return (
        <BesViewing style={{ flex: 1 }}>
            <Textic
                style={{
                    letterSpacing: 0.5,
                    color: '#120000',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: skixheig * 0.01,
                    fontSize: skixheig * 0.031,
                }}
            >
                Gallery
            </Textic>
            {gallery.length === 0 ? (
                <BesViewing
                    style={{
                        flex: 1,
                        marginTop: skixheig * 0.04,
                        alignItems: 'center',
                    }}
                >
                    <Textic
                        style={{
                            paddingHorizontal: skixwit * 0.08,
                            color: '#120000',
                            fontWeight: '700',
                            textAlign: 'center',
                            marginVertical: skixheig * 0.04,
                            fontSize: skixheig * 0.025,
                        }}
                    >
                        No unlocked images.{"\n"}Play levels to fill your gallery.
                    </Textic>
                    <Imaginest
                        source={EMPTY_IMG}
                        style={{
                            resizeMode: 'contain',
                            marginTop: skixheig * 0.04,
                            height: skixwit * 0.7,
                            marginBottom: skixheig * 0.03,
                            width: skixwit * 0.7,
                        }}
                    />
                </BesViewing>
            ) : (
                <>
                    {gallery.length > 0 && current && (
                        <BesViewing
                            style={{
                                elevation: 3,
                                marginTop: skixheig * 0.025,
                                width: skixwit * 0.85,
                                backgroundColor: colors.bg,
                                borderRadius: skixwit * 0.06,
                                padding: skixheig * 0.03,
                                alignSelf: 'center',
                            }}
                        >
                            <Imaginest
                                source={current.img}
                                style={{
                                    resizeMode: 'cover',
                                    borderRadius: skixwit * 0.04,
                                    height: skixheig * 0.28,
                                    alignSelf: 'center',
                                    width: skixwit * 0.75,
                                }}
                            />
                            <Textic
                                style={{
                                    fontStyle: 'italic',
                                    color: colors.text,
                                    marginTop: skixheig * 0.02,
                                    textAlign: 'center',
                                    fontSize: skixheig * 0.021,
                                }}
                            >
                                {current.fact}
                            </Textic>
                            <Textic style={{
                                    fontSize: skixheig * 0.018,
                                    marginTop: skixheig * 0.019,
                                    textAlign: 'center',
                                    color: colors.text,
                                }}
                            >
                                {`Puzzle assembly date: ${
                                    (() => {
                                        const d = new Date(current.date);
                                        return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
                                    })()
                                }\nPuzzle assembly time: ${String(Math.floor(current.time / 60)).padStart(2, '0')}:${String(current.time % 60).padStart(2, '0')}`}
                            </Textic>
                        </BesViewing>
                    )}
                    <BesViewing style={{
                            marginTop: skixheig * 0.04,
                            justifyContent: 'center',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <PresopacitNds
                            disabled={currentIdx === 0}
                            onPress={() => setCurrentIdx(i => Math.max(i - 1, 0))}
                            style={{
                                marginHorizontal: skixwit * 0.08,
                            }}
                        >
                            <Imaginest
                                source={currentIdx === 0 ? ARROW_LEFT_GRAY_IMG : ARROW_LEFT_ACTIVE_IMG}
                                style={{
                                    width: skixwit * 0.09,
                                    height: skixwit * 0.09,
                                    resizeMode: 'contain',
                                }}
                            />
                        </PresopacitNds>
                        <PresopacitNds
                            disabled={currentIdx === gallery.length - 1 || gallery.length === 0}
                            onPress={() => setCurrentIdx(i => Math.min(i + 1, gallery.length - 1))}
                            style={{
                                marginHorizontal: skixwit * 0.08,
                            }}
                        >
                            <Imaginest
                                source={
                                    currentIdx === gallery.length - 1 || gallery.length === 0
                                        ? ARROW_RIGHT_GRAY_IMG
                                        : ARROW_RIGHT_ACTIVE_IMG
                                }
                                style={{
                                    width: skixwit * 0.09,
                                    height: skixwit * 0.09,
                                    resizeMode: 'contain',
                                }}
                            />
                        </PresopacitNds>
                    </BesViewing>
                </>
            )}
            {/* Home button */}
            <PresopacitNds
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    alignSelf: 'center',
                    width: skixwit * 0.16,
                    height: skixwit * 0.16,
                    borderRadius: skixwit * 0.08,
                    bottom: skixheig * 0.04,
                }}
                onPress={() => setActivebstlixsShow('Clix Slidinends Best First')}
            >
                <Imaginest
                    source={HOME_IMG}
                    style={{
                        resizeMode: 'contain',
                        height: skixwit * 0.16,
                        width: skixwit * 0.16,
                    }}
                />
            </PresopacitNds>
        </BesViewing>
    );
}
