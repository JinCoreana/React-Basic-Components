import React, { useMemo } from 'react';
import styled from '@emotion/styled/macro'
import { keyframes, css } from '@emotion/react'

interface Props {
    width?: number;
    height?: number;
    circle?: boolean;
    rounded?: boolean;
    count?: number;
    unit?: string;
    animation?: boolean;
    color?: string;
    style?: React.CSSProperties;
}

const pulseKeyframes = keyframes` 
0% {
    opacity: 1;
}

50% {
    opacity: 0.4;
}

100% {
    opacity: 1;
}`;


const pulseAnimation = css`
    animation: ${pulseKeyframes} 1.5s ease-in-out 0.5s infinite;
    `

const Base = styled.span<Props>`
${({ color }) => color && `background-color: ${color}`};
${({ rounded }) => rounded && `border-radius: 8px`};
${({ circle }) => circle && `border-radius: 50%`};
${({ width, height }) => (width || height) && 'display: block'};
${({ animation }) => animation && pulseAnimation};
width: ${({ width, unit }) => width && unit && `${width}${unit}`};
height: ${({ height, unit }) => height && unit && `${height}${unit}`};
`;

const Content = styled.span`
    opacity: 0;
    `;

const Skeleton: React.FC<Props> = ({
    count,
    width,
    height,
    circle,
    rounded,
    animation = true,
    unit = 'px',
    color = '#ebebeb',
    style,
    children }) => {

    const content = useMemo(() => [...Array({ length: count })].map(() => '-').join(''), [count])

    return (
        <>
            <Base
                width={width}
                height={height}
                circle={circle}
                rounded={rounded}
                animation={animation}
                color={color}
                style={style}
                unit={unit}>
                <Content>
                    {children || content}
                </Content>
            </Base>
        </>
    )
}

export default Skeleton;