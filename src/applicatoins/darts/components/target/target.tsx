type TargetProps = {
    onHit: (points: number) => void;
};

const numbers = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];

export const Target = ({ onHit }: TargetProps) => {
    const center = 250;
    const baseRadii = {
        doubleOuter: 180,
        doubleInner: 170,
        outer: 170,
        tripleOuter: 114,
        tripleInner: 107,
        inner: 107,
        bullOuter: 15,
        bullInner: 6,
        labelRadius: 195,
    };

    const createArc = (
        r1: number,
        r2: number,
        startAngle: number,
        endAngle: number
    ) => {
        const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
        const polar = (r: number, angle: number) => ({
            x: center + r * Math.cos(angle),
            y: center + r * Math.sin(angle),
        });

        const p1 = polar(r1, startAngle);
        const p2 = polar(r1, endAngle);
        const p3 = polar(r2, endAngle);
        const p4 = polar(r2, startAngle);

        return `
      M ${p1.x} ${p1.y}
      A ${r1} ${r1} 0 ${largeArc} 1 ${p2.x} ${p2.y}
      L ${p3.x} ${p3.y}
      A ${r2} ${r2} 0 ${largeArc} 0 ${p4.x} ${p4.y}
      Z
    `;
    };

    const sectors = numbers.map((number, i) => {
        const start = ((i * 18 - 98) * Math.PI) / 180;
        const end = (((i + 1) * 18 - 98) * Math.PI) / 180;
        const angleDeg = ((start + end) / 2) * (180 / Math.PI);

        const polar = (r: number) => ({
            x: center + r * Math.cos((start + end) / 2),
            y: center + r * Math.sin((start + end) / 2),
        });

        return {
            number,
            doublePath: createArc(baseRadii.doubleOuter, baseRadii.doubleInner, start, end),
            singleOuterPath: createArc(baseRadii.doubleInner, baseRadii.tripleOuter, start, end),
            triplePath: createArc(baseRadii.tripleOuter, baseRadii.tripleInner, start, end),
            singleInnerPath: createArc(baseRadii.tripleInner, baseRadii.bullOuter, start, end),
            labelPos: polar(baseRadii.labelRadius),
            angle: angleDeg,
        };
    });

    return (
        <svg
            viewBox="0 0 500 500"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            style={{ display: 'block' }}
        >
            {/* Промах зона */}
            <circle
                cx={center}
                cy={center}
                r={baseRadii.doubleOuter + 25}
                fill="#ddd"
                onClick={() => onHit(0)}
                style={{ cursor: 'pointer' }}
            />


            {sectors.map(({ number, doublePath, singleInnerPath, singleOuterPath, triplePath }, i) => (
                <g key={i}>
                    {/* Двойное кольцо */}
                    <path
                        d={doublePath}
                        fill="#0c0"
                        stroke="#fff"
                        onClick={() => onHit(number * 2)}
                        style={{ cursor: 'pointer' }}
                    />
                    {/* Обычное внешнее кольцо */}
                    <path
                        d={singleOuterPath}
                        fill={i % 2 === 0 ? '#222' : '#aaa'}
                        stroke="#fff"
                        onClick={() => onHit(number)}
                        style={{ cursor: 'pointer' }}
                    />
                    {/* Тройное кольцо */}
                    <path
                        d={triplePath}
                        fill="#c00"
                        stroke="#fff"
                        onClick={() => onHit(number * 3)}
                        style={{ cursor: 'pointer' }}
                    />
                    {/* Обычное внутреннее кольцо */}
                    <path
                        d={singleInnerPath}
                        fill={i % 2 === 0 ? '#222' : '#aaa'}
                        stroke="#fff"
                        onClick={() => onHit(number)}
                        style={{ cursor: 'pointer' }}
                    />
                </g>
            ))}

            {/* Bull и outer bull */}
            <circle
                cx={center}
                cy={center}
                r={baseRadii.bullOuter}
                fill="green"
                stroke="#fff"
                onClick={() => onHit(25)}
                style={{ cursor: 'pointer' }}
            />
            <circle
                cx={center}
                cy={center}
                r={baseRadii.bullInner}
                fill="red"
                stroke="#fff"
                onClick={() => onHit(50)}
                style={{ cursor: 'pointer' }}
            />

            {/* Надписи */}
            {sectors.map(({ number, labelPos, angle }, i) => (
                <text
                    key={`label-${i}`}
                    x={labelPos.x}
                    y={labelPos.y}
                    fontSize={14}
                    fill="#000"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    transform={`rotate(${angle}, ${labelPos.x}, ${labelPos.y})`}
                >
                    {number}
                </text>
            ))}
        </svg>
    );
};
