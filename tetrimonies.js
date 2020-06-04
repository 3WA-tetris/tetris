/* ---------------------------------------------------------------------------
$   TETRIMONIES
$   1. They are organised in the following order:
$      Z piece, S piece, J piece, T piece, L piece, I piece, square (O) piece
---------------------------------------------------------------------------- */

const Z = [
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ],
    [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
    ],
    [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
    ],
    [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0],
    ]
];

const S = [
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ],
    [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
    ],
    [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
    ],
    [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
    ]
];

const J = [
    [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
    ]
];

const T = [
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
    ],
    [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
    ]
];

const L = [
    [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
    ],
    [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
    ]
];

const I = [
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
    ],
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
    ],
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
    ]
];

const O = [
    [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
    ]
];