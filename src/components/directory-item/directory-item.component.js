import React from 'react';
import { BackgroundImage, Body, DirectoryItemContainer } from './directory-item.stlyes'

const DirectoryItem = ({ category }) => {
    const { imageUrl, title } = category;
    return (
        <DirectoryItemContainer>       
               < BackgroundImage imageUrl={imageUrl} />
            <Body>
                <h2>{ title }</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>    
    )
}

export default DirectoryItem;