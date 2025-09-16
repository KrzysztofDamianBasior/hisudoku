import { createContext } from "react";

import type { SudokuModelType } from "../../../models/internalAppRepresentation";

export type FeedStateType = {
    sudokus: SudokuModelType[];
};

export type FeedContextType = FeedStateType & {
    setFeed: (actionPayload: FeedStateType) => void;
    removeSudoku: (actionPayload: { sudokuId: number }) => void;
    addSudoku: (actionPayload: SudokuModelType) => void;
    // updateSudoku: (actionPayload: SudokuModelType) => void;
};

export const initialState: FeedStateType = {
    sudokus: [
        {
            content:
                "267.084.000;003.250.000;904.000.000;500.078.962;076.400.105;000.001.370;705.802.490;000.005.200;420.100.753;",
            origin: "pregenerated",
            createdAt: "12/9/2025 | 0:24:14",
            id: 1,
            level: "easy",
        },
        {
            content:
                "097.000.520;302.010.800;060.427.100;000.030.040;704.500.600;019.700.308;900.001.400;800.340.270;070.256.980;",
            origin: "pregenerated",
            createdAt: "12/9/2025 | 0:24:14",
            id: 2,
            level: "easy",
        },
        {
            content:
                "402.638.100;080.950.300;310.072.506;070.123.650;800.700.001;000.080.000;043.810.002;600.004.010;190.005.007;",
            origin: "pregenerated",
            createdAt: "12/9/2025 | 0:24:14",
            id: 3,
            level: "easy",
        },
        {
            content:
                "760.003.000;000.001.870;301.070.600;043.009.000;000.004.067;010.000.009;000.005.030;900.010.005;500.286.000;",
            origin: "pregenerated",
            createdAt: "12/9/2025 | 0:24:14",
            id: 4,
            level: "medium",
        },
        {
            content:
                "497.080.003;013.709.506;080.002.000;004.000.000;105.090.800;800.003.042;008.965.021;901.020.005;052.030.408;",
            origin: "pregenerated",
            createdAt: "12/9/2025 | 0:24:14",
            id: 5,
            level: "medium",
        },
        {
            content:
                "002.763.941;063.104.500;091.205.603;928.657.034;316.002.709;504.001.068;645.300.027;280.076.005;007.028.400;",
            origin: "pregenerated",
            createdAt: "12/9/2025 | 0:24:14",
            id: 6,
            level: "easy",
        },
        {
            content:
                "086.903.741;517.406.093;934.708.056;491.080.300;073.504.100;800.001.970;740.035.629;009.672.030;000.049.510;",
            origin: "pregenerated",
            createdAt: "12/9/2025 | 0:24:14",
            id: 7,
            level: "easy",
        },
        {
            content:
                "709.065.004;065.012.309;130.870.502;341.207.690;297.651.400;658.903.007;070.000.083;013.028.056;902.030.740;",
            origin: "pregenerated",
            createdAt: "12/9/2025 | 0:24:14",
            id: 8,
            level: "easy",
        },
        {
            content:
                "407.209.063;003.670.294;269.000.571;002.017.349;301.962.700;790.003.106;108.796.400;500.408.010;934.100.687;",
            origin: "pregenerated",
            createdAt: "12/9/2025 | 0:24:14",
            id: 9,
            level: "easy",
        },
        {
            content:
                "678.500.310;004.381.500;500.760.008;489.003.670;325.176.894;067.498.030;856.007.000;940.015.783;030.042.906;",
            origin: "pregenerated",
            createdAt: "12/9/2025 | 0:24:14",
            id: 10,
            level: "easy",
        },
    ],
};

export const FeedContext = createContext<FeedContextType>({
    ...initialState,
    addSudoku: () => {},
    removeSudoku: () => {},
    setFeed: () => {},
});
