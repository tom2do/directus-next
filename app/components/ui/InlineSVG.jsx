"use client";

import React, { useEffect, useState } from 'react';

const InlineSVG = ({ src, className }) => {
    const [svgContent, setSvgContent] = useState('');

    useEffect(() => {
        if (!src) return;

        const proxySrc = src.replace(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/`, '/directus-assets/');
        const fetchUrl = typeof window !== 'undefined' ? (window.location.origin + proxySrc) : proxySrc;
        
        fetch(fetchUrl, { cache: 'no-store' })
            .then(response => response.text())
            .then(data => {

                setSvgContent(data);
            })
            .catch(err => console.error('Error fetching SVG:', err));
    }, [src]);

    if (!svgContent) {
        return <span className={className}></span>;
    }

    return (
        <span 
            className={className + ' nav--icon'}
            dangerouslySetInnerHTML={{ __html: svgContent }} 
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}
        />
    );
};

export default InlineSVG;
