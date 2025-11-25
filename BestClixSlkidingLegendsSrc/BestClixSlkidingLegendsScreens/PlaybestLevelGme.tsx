import React, { useState, useEffect, useRef } from 'react';
import {
    Image as GameImages,
    View as SlingViiieew,
    Animated,
    TouchableOpacity as BstPresWithOpacity,
    Dimensions as Dimsens,
    Text as Legetextex,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CATEGORIES = [
    { key: 'kickoff', label: 'Kickoff', img: require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/clilegAstonbor/UnlockTheLegends.png') },
    { key: 'halftime', label: 'Half-Time', img: require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/clilegAstonbor/UnlockTheLegends.png') },
    { key: 'finalwhistle', label: 'Final Whistle', img: require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/clilegAstonbor/UnlockTheLegends.png') },
];

const PUZZLE_IMAGES = {
    easy: {
        kickoff: require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/puzzleEasyKickoff.png'),
        halftime: require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/puzzleEasyHalftime.png'),
        finalwhistle: require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/puzzleEasyFinalwhistle.png'),
    },
    medium: {
        kickoff: require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/puzzleMediumKickoff.png'),
        halftime: require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/puzzleMediumHalftime.png'),
        finalwhistle: require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/puzzleMediumFinalwhistle.png'),
    },
    hard: {
        kickoff: require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/puzzleHardKickoff.png'),
        halftime: require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/puzzleHardHalftime.png'),
        finalwhistle: require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/puzzleHardFinalwhistle.png'),
    },
};

const PUZZLE_TEXT = {
    easy: [
        "Roberto Carlos’ Impossible Free Kick\nHis 1997 strike defied the laws of physics — the ball curved wildly outside the post and swerved back into the net. One of the most unbelievable goals in football history.",
        "Michael Jordan’s Last Shot\nWith seconds left on the clock, Jordan sank the game-winning jumper that sealed Chicago’s sixth NBA title. It became the perfect symbol of his legendary career’s finale.",
        "Muhammad Ali’s Iconic Photo\nStanding over his fallen opponent, Ali embodied confidence, power, and defiance. That frame became one of the most famous images in sports history.",
    ],
    medium: [
        "Diego Maradona’s “Hand of God” Goal\nIn the 1986 match against England, Maradona scored with his hand — and minutes later, produced the “Goal of the Century.” Controversial yet immortal.",
        "Usain Bolt’s Olympic Record\nBolt didn’t just win — he stopped time. His 9.69-second sprint in Beijing became a symbol of human speed and dominance.",
        "Cristiano Ronaldo’s Gravity-Defying Header\nJumping over 2.5 meters high, he met the ball mid-air and scored a goal that stunned the world. Pure athletic perfection.",
    ],
    hard: [
        "Emiliano Martínez’s World Cup Save (2022)\nIn the dying seconds of the final, his miraculous save kept Argentina alive. That moment gave Messi his long-awaited world title.",
        "Rogério Ceni’s Free-Kick Goal\nA goalkeeper who scored more than 130 goals — Ceni turned free-kicks into art and redefined his position forever.",
        "Oleksandr Usyk’s Historic Achievement\nThe Ukrainian champion conquered multiple weight classes, unified world titles, and defeated the favorites. A story of skill, discipline, and resilience.",
    ],
};

const TROPHY_IMG = require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/clilegAstonbor/UnlockTheLegends.png');
const HOME_IMG = require('../BestClixSlkidingLegendsAssets/BestClixSlkidingLegendsImages/goMackclix.png');

const ACHIEVEMENTS = [
    { key: 'easy_complete', label: 'Easy Complete', condition: (d, t) => d === 'easy' },
    { key: 'medium_complete', label: 'Medium Complete', condition: (d, t) => d === 'medium' },
    { key: 'hard_complete', label: 'Hard Complete', condition: (d, t) => d === 'hard' },
    { key: 'easy_under_1min', label: 'Easy Done within 1min', condition: (d, t) => d === 'easy' && t <= 60 },
    { key: 'medium_under_3min', label: 'Medium Done within 3min', condition: (d, t) => d === 'medium' && t <= 180 },
    { key: 'hard_under_3min', label: 'Hard Done within 3min', condition: (d, t) => d === 'hard' && t <= 180 },
];

function getGridSize(difficulty: string) {
    if (difficulty === 'easy') return 3;
    if (difficulty === 'medium') return 4;
    return 5;
}

function getInversionCount(arr: number[], size: number) {
    let inv = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === -1) continue;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] === -1) continue;
            if (arr[i] > arr[j]) inv++;
        }
    }
    return inv;
}

function isSolvable(arr: number[], size: number) {
    const inv = getInversionCount(arr, size);
    if (size % 2 === 1) {
        // odd grid: solvable if inversions even
        return inv % 2 === 0;
    } else {
        // even grid: blank row from bottom (0-based)
        const blankRow = size - Math.floor(arr.indexOf(-1) / size);
        // blank on even row from bottom: inversions odd
        // blank on odd row from bottom: inversions even
        return (blankRow % 2 === 0) ? (inv % 2 === 1) : (inv % 2 === 0);
    }
}

function getHardcodedSolvable(size: number) {
    // Always set the empty cell at the bottom-right (last index)
    // Example: for 3x3, [1,2,3,4,5,6,7,8,-1] is solved, [1,2,3,4,5,6,7,-1,8] is solvable and not solved
    if (size === 3) return [1, 2, 3, 4, 5, 6, 7, 8, -1];
    if (size === 4) return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, -1];
    if (size === 5) return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, -1];
    // fallback to solved
    const arr = Array.from({ length: size * size - 1 }, (_, i) => i + 1).concat([-1]);
    return arr;
}

function shuffleTiles(size: number) {
    // Generate a random, solvable, and not-already-solved arrangement
    const arr = Array.from({ length: size * size - 1 }, (_, i) => i + 1).concat([-1]);
    let shuffled = [];
    do {
        shuffled = [...arr];
        // Fisher-Yates shuffle
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
    } while (!isSolvable(shuffled, size) || isSolved(shuffled));
    return shuffled;
}

function isAdjacent(idx1: number, idx2: number, size: number) {
    const x1 = idx1 % size, y1 = Math.floor(idx1 / size);
    const x2 = idx2 % size, y2 = Math.floor(idx2 / size);
    return (Math.abs(x1 - x2) + Math.abs(y1 - y2)) === 1;
}

function isSolved(tiles: number[]) {
    // Solved if all tiles in order and last is -1 (bottom-right)
    for (let i = 0; i < tiles.length - 1; i++) {
        if (tiles[i] !== i + 1) return false;
    }
    return tiles[tiles.length - 1] === -1;
}

export default function PlaybestLevelGme({
    setActivebstlixsShow,
    difficulty,
    setSelectedDifficulty,
}: {
    setActivebstlixsShow: (section: string) => void,
    difficulty: string,
    setSelectedDifficulty: (difficulty: string | null) => void,
}) {
    const { width: skixwit, height: skixheig } = Dimsens.get('window');
    const [category, setCategory] = useState<string | null>(null);
    const [tiles, setTiles] = useState<number[]>([]);
    const [timer, setTimer] = useState(0);
    const [started, setStarted] = useState(false);
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    const [factVisible, setFactVisible] = useState(false);
    const [factAnim] = useState(new Animated.Value(0));
    const [factText, setFactText] = useState('');
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (started) {
            intervalRef.current = setInterval(() => setTimer(t => t + 1), 1000);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [started]);

    useEffect(() => {
        if (category) {
            const size = getGridSize(difficulty);
            // Delay state update to avoid blocking UI thread
            setTimeout(() => {
                setTiles(shuffleTiles(size));
                setTimer(0);
                setStarted(true);
                setSelectedIdx(null);
            }, 0);
        }
    }, [category, difficulty]);

    const unlockNextDifficulty = async () => {
        const levels = await AsyncStorage.getItem('levelsOpen');
        let parsed = levels ? JSON.parse(levels) : { easy: true, medium: false, hard: false };
        if (difficulty === 'easy' && !parsed.medium) {
            parsed.medium = true;
            await AsyncStorage.setItem('levelsOpen', JSON.stringify(parsed));
        } else if (difficulty === 'medium' && !parsed.hard) {
            parsed.hard = true;
            await AsyncStorage.setItem('levelsOpen', JSON.stringify(parsed));
        }
    };

    // Save gallery result
    const saveGalleryResult = async (category: string, time: number) => {
        const img = PUZZLE_IMAGES[difficulty][category];
        const fact = PUZZLE_TEXT[difficulty][['kickoff', 'halftime', 'finalwhistle'].indexOf(category)];
        const key = `${difficulty}_${category}`;
        const now = new Date().toISOString();

        let galleryRaw = await AsyncStorage.getItem('gallery');
        let gallery = galleryRaw ? JSON.parse(galleryRaw) : [];
        const idx = gallery.findIndex((g: any) => g.key === key);

        if (idx === -1) {
            gallery.push({ key, img, fact, date: now, time });
        } else if (gallery[idx].time > time) {
            gallery[idx] = { key, img, fact, date: now, time };
        }
        await AsyncStorage.setItem('gallery', JSON.stringify(gallery));
    };

    // Save achievements
    const saveAchievements = async (category: string, time: number) => {
        let achRaw = await AsyncStorage.getItem('achievements');
        let achievements = achRaw ? JSON.parse(achRaw) : [];
        ACHIEVEMENTS.forEach(a => {
            if (a.condition(difficulty, time)) {
                if (!achievements.includes(a.key)) {
                    achievements.push(a.key);
                }
            }
        });
        await AsyncStorage.setItem('achievements', JSON.stringify(achievements));
    };

    const handleTilePress = (idx: number) => {
        const size = getGridSize(difficulty);
        const emptyIdx = tiles.indexOf(-1);

        if (selectedIdx === null) {
            // Select only if tapped tile is adjacent to empty
            if (isAdjacent(idx, emptyIdx, size)) {
                setSelectedIdx(idx);
            }
        } else if (selectedIdx === idx) {
            setSelectedIdx(null);
        } else {
            // Only allow swap if one is empty and they are adjacent
            if (
                (tiles[selectedIdx] === -1 && isAdjacent(selectedIdx, idx, size)) ||
                (tiles[idx] === -1 && isAdjacent(selectedIdx, idx, size))
            ) {
                const newTiles = [...tiles];
                [newTiles[selectedIdx], newTiles[idx]] = [newTiles[idx], newTiles[selectedIdx]];
                setTiles(newTiles);
                setSelectedIdx(null);
                if (isSolved(newTiles)) {
                    setStarted(false);
                    unlockNextDifficulty();
                    saveGalleryResult(category!, timer);
                    saveAchievements(category!, timer);
                    // Show animated fact text below puzzle
                    const catIdx = ['kickoff', 'halftime', 'finalwhistle'].indexOf(category!);
                    setFactText(PUZZLE_TEXT[difficulty][catIdx]);
                    setFactVisible(true);
                    factAnim.setValue(0);
                    Animated.timing(factAnim, {
                        toValue: 1,
                        duration: 700,
                        useNativeDriver: true,
                    }).start();
                }
            } else {
                // If tapped another adjacent to empty, select it
                if (isAdjacent(idx, emptyIdx, size)) {
                    setSelectedIdx(idx);
                } else {
                    setSelectedIdx(null);
                }
            }
        }
    };

    // Category selection screen
    if (!category) {
        return (
            <SlingViiieew style={{ flex: 1 }}>
                <GameImages
                    source={TROPHY_IMG}
                    style={{
                        width: skixwit * 0.7,
                        height: skixheig * 0.23,
                        alignSelf: 'center',
                        marginTop: skixheig * 0.03,
                        resizeMode: 'contain',
                    }}
                />
                <Legetextex
                    style={{
                        fontSize: skixheig * 0.035,
                        color: '#120000',
                        textAlign: 'center',
                        marginTop: skixheig * 0.01,
                        fontWeight: 'bold',
                    }}
                >
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </Legetextex>
                {CATEGORIES.map((cat, idx) => (
                    <BstPresWithOpacity
                        key={cat.key}
                        onPress={() => setCategory(cat.key)}
                        style={{
                            justifyContent: 'center',
                            alignSelf: 'center',
                            alignItems: 'center',
                            backgroundColor: difficulty === 'easy' ? '#FCCE03' : difficulty === 'medium' ? '#183153' : '#CD0011',
                            borderRadius: skixheig * 0.06,
                            marginTop: skixheig * 0.025,
                            paddingVertical: skixheig * 0.022,
                            width: skixwit * 0.8,
                        }}
                    >
                        <Legetextex
                            style={{
                                fontSize: skixheig * 0.032,
                                color: difficulty === 'easy' ? '#120000' : difficulty === 'medium' ? '#fff' : '#fff',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                letterSpacing: 0.5,
                            }}
                        >
                            {cat.label}
                        </Legetextex>
                    </BstPresWithOpacity>
                ))}
                <BstPresWithOpacity
                    onPress={() => {
                        setSelectedDifficulty(null);
                    }}
                    style={{
                        justifyContent: 'center',
                        borderRadius: skixwit * 0.08,
                        height: skixwit * 0.16,
                        alignSelf: 'center',
                        width: skixwit * 0.16,
                        position: 'absolute',
                        alignItems: 'center',
                        bottom: skixheig * 0.04,
                    }}
                >
                    <GameImages
                        source={HOME_IMG}
                        style={{
                            width: skixwit * 0.16,
                            height: skixwit * 0.16,
                            resizeMode: 'contain',
                        }}
                    />
                </BstPresWithOpacity>
            </SlingViiieew>
        );
    }

    // Puzzle game screen
    const size = getGridSize(difficulty);
    const imgSrc = PUZZLE_IMAGES[difficulty][category!];
    const tileSize = skixwit * 0.8 / size;
    const imgWidth = tileSize * size;
    const imgHeight = tileSize * size;

    // Render NxN grid
    return (
        <SlingViiieew style={{ flex: 1 }}>
            {factVisible && (
                <Legetextex
                    style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: skixwit * 0.05,
                        color: '#120000',
                    }}
                >
                    Level Complete{'\n'}
                    Your Time:
                </Legetextex>
            )}
            <Legetextex
                style={{
                    fontWeight: 'bold',
                    color: '#120000',
                    marginTop: factVisible ? skixheig * 0.016 : skixheig * 0.06,
                    textAlign: 'center',
                    fontSize: skixheig * 0.04,
                }}
            >
                {`${String(Math.floor(timer / 60)).padStart(2, '0')}:${String(timer % 60).padStart(2, '0')}`}
            </Legetextex>
            <SlingViiieew
                style={{
                    alignSelf: 'center',
                    height: imgHeight,
                    width: imgWidth,
                    backgroundColor: 'transparent',
                    marginTop: skixheig * 0.04,
                }}
            >
                {Array.from({ length: size }).map((_, row) => (
                    <SlingViiieew key={row} style={{ flexDirection: 'row' }}>
                        {Array.from({ length: size }).map((_, col) => {
                            const idx = row * size + col;
                            const tileIdx = tiles[idx];
                            const isSelected = selectedIdx === idx;
                            if (tileIdx === -1) {
                                // empty cell (bottom-right of photo)
                                return (
                                    <BstPresWithOpacity
                                        key={idx}
                                        onPress={() => handleTilePress(idx)}
                                        style={{
                                            alignItems: 'center',
                                            width: tileSize,
                                            borderWidth: isSelected ? skixwit * 0.01 : 0,
                                            height: tileSize,
                                            borderColor: isSelected ? '#120000' : 'transparent',
                                            justifyContent: 'center',
                                            backgroundColor: isSelected ? '#FCCE03' : 'transparent',
                                        }}
                                    />
                                );
                            }
                            // Calculate crop for image
                            const srcRow = Math.floor((tileIdx - 1) / size);
                            const srcCol = (tileIdx - 1) % size;
                            return (
                                <BstPresWithOpacity
                                    key={idx}
                                    activeOpacity={0.7}
                                    onPress={() => handleTilePress(idx)}
                                    style={{
                                        justifyContent: 'center',
                                        height: tileSize,
                                        borderRadius: skixwit * 0.019,
                                        overflow: 'hidden',
                                        alignItems: 'center',
                                        backgroundColor: isSelected ? '#FCCE03' : '#fff',
                                        borderWidth: isSelected ? skixwit * 0.01 : 0,
                                        borderColor: isSelected ? '#CD0011' : 'transparent',
                                        width: tileSize,
                                        margin: 0,
                                    }}
                                >
                                    <GameImages
                                        source={imgSrc}
                                        style={{
                                            resizeMode: 'cover',
                                            top: -srcRow * tileSize,
                                            position: 'absolute',
                                            left: -srcCol * tileSize,
                                            width: imgWidth,
                                            height: imgHeight,
                                        }}
                                    />
                                </BstPresWithOpacity>
                            );
                        })}
                    </SlingViiieew>
                ))}
            </SlingViiieew>
            {/* Animated fact text below puzzle */}
            {factVisible && (
                <Animated.View
                    style={{
                        opacity: factAnim,
                        transform: [{ translateY: factAnim.interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) }],
                        marginTop: skixheig * 0.03,
                        paddingHorizontal: skixwit * 0.08,
                    }}
                >
                    <Legetextex
                        style={{
                            padding: skixheig * 0.015,
                            fontSize: skixwit * 0.044,
                            elevation: 2,
                            color: '#120000',
                            textAlign: 'center',
                            fontStyle: 'italic',
                        }}
                    >
                        {factText}
                    </Legetextex>
                </Animated.View>
            )}
            <BstPresWithOpacity
                onPress={() => {
                    setCategory(null);
                    setFactVisible(false);
                }}
                style={{
                    justifyContent: 'center',
                    position: 'absolute',
                    alignItems: 'center',
                    bottom: skixheig * 0.04,
                    width: skixwit * 0.16,
                    height: skixwit * 0.16,
                    borderRadius: skixwit * 0.08,
                    alignSelf: 'center',
                }}
            >
                <GameImages source={HOME_IMG} style={{ resizeMode: 'contain', height: skixwit * 0.16, width: skixwit * 0.16}}/>
            </BstPresWithOpacity>
        </SlingViiieew>
    );
}