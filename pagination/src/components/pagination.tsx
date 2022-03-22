import React from 'react';
import usePagination from '../hooks/usePagination';
import styled from '@emotion/styled/macro'
import { css } from '@emotion/react'
import { AiOutlineEllipsis } from 'react-icons/ai'
import { GrFormPrevious, GrFormNext } from 'react-icons/gr'
interface Props {
    count: number;
    page: number;
    onPageChange: (page: number) => void;
    disabled?: boolean;
    siblingCount?: number;
    boundaryCount?: number;
}

const Navigation = styled.nav``
const Item = styled.li``
const ItemList = styled.ul`
margin:0;
padding: 0;
display: flex;
list-style: none;
${Item} + ${Item} {
    margin-left: 8px;
}
`

const Button = styled.button < { selected?: boolean }>`
color: ${({ selected }) => selected ? '#fff' : '#000'};
border: 0;
margin: 0;
padding: 8px 12px;
font-size: 16px;
font-weight: normal;
background-color: ${({ selected }) => selected ? '#e9a617' : '#fff'};
cursor: pointer;
border-radius: 100%;
width: 48px;
height: 48px;
&:hover{
    background-color: #e9a617;
    color: #fff;
}
&:active{
    opacity: 0.8;
}
`

const Pagination: React.FC<Props> = ({
    count,
    page,
    onPageChange,
    disabled,
    siblingCount,
    boundaryCount
}) => {

    const getLabel = (item: number | string) => {
        if (typeof item === 'number') return item;
        else if (item.indexOf('ellipsis') > -1) return <AiOutlineEllipsis />
        else if (item.indexOf('prev') > -1) return <GrFormPrevious />
        else if (item.indexOf('next') > -1) return <GrFormNext />
    }


    const { items } = usePagination({

        count,
        page,
        onPageChange,
        disabled,
        siblingCount,
        boundaryCount
    })

    return (
        <>
            <Navigation>
                <ItemList>
                    {
                        items.map(({ key, disabled, onClick, selected, item }) => (
                            <Item key={key}>
                                <Button disabled={disabled} selected={selected} onClick={onClick} >{getLabel(item)}</Button>
                            </Item>
                        ))
                    }
                </ItemList>
            </Navigation>

        </>
    )

}

export default Pagination;