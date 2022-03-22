import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled/macro'
import { css } from '@emotion/react'
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri'
import image1 from '../images/image1.jpg'
import image2 from '../images/image2.jpg'
import image3 from '../images/image3.jpg'
import image4 from '../images/image4.jpg'


const Base = styled.div`
`;
const Container = styled.div`
position: relative;`
const ArrowButton = styled.button<{ pos: 'left' | 'right' }>`
    font-size: 200px;
 position: absolute;
 top: 50%;
 z-index: 1;
 padding: 8px 12px;
 background-color: transparent;
 color: #fff;
 border: none;
 margin: 0; 
 cursor: pointer;
 ${({ pos }) => pos === `left` ?
        css`left:0;`
        : css`right:0;`}
`;


const CarouselList = styled.ul`
list-style: none;
margin:0;
padding:0;
display:flex;
overflow:hidden;`;

const CarouselListItem = styled.li<{ activeIndex: number }>`
width: 100%;
flex: 1 0 100%;
transform: translateX(-${({ activeIndex }) => activeIndex * 100}%);
transition: 200ms ease;
>img{
 width: 100%;
height: 100%;

}`


const NavButton = styled.button <{ isActive?: boolean }>`
width: 100px;
height:20px;
background-color: #000;
opacity: ${({ isActive }) => isActive ? 0.3 : 0.1};
`
const NavItem = styled.li`
display: inline-block;
;`
const Nav = styled.ul`
list-style:none;
 padding: 0;
 margin: 0, auto;
 display: flex;
 justify-content: center;
 ${NavItem} + ${NavItem} {
    margin-left: 5px;
 }`



const banners = [image1, image2, image3, image4];



const Carousel: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [focused, setFocused] = useState<boolean>(false);

    const handleNext = () => {
        setActiveIndex(prev => (prev + 1) % banners.length);
    }
    const handlePrev = () => {
        setActiveIndex(prev => (prev - 1 + banners.length) % banners.length);
    }
    const handleGoTo = (idx: number) => setActiveIndex(idx);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        if (!focused) {
            intervalId = setInterval(handleNext, 3000);
        }
        return () => {
            clearInterval(intervalId);
        }
    }, [focused])


    return (
        <>
            <Base
                onMouseEnter={() => setFocused(true)}
                onMouseLeave={() => setFocused(false)}>
                <Container>
                    <ArrowButton pos="left" onClick={handlePrev}>
                        <RiArrowDropLeftLine />
                    </ArrowButton>
                    <CarouselList>
                        {
                            banners.map((banner, idx) => (
                                <CarouselListItem activeIndex={activeIndex} key={idx}>
                                    <img src={banner} alt="images" />
                                </CarouselListItem>
                            ))
                        }
                    </CarouselList>
                    <ArrowButton pos="right" onClick={handleNext}>
                        <RiArrowDropRightLine />
                    </ArrowButton>
                </Container>
                <Nav>
                    {
                        Array.from({ length: banners.length }).map((_, idx) => (
                            <NavItem key={idx} onClick={() => handleGoTo(idx)}>
                                <NavButton isActive={activeIndex === idx} />
                            </NavItem>
                        ))
                    }
                </Nav>
            </Base>
        </>
    )
}

export default Carousel;