// RemoteReactSelectWrapper.client.jsx
'use client';

import dynamic from 'next/dynamic';

const RemoteReactSelectWrapper = dynamic(
    () => import('./RemoteReactSelectWrapper').then(mod => mod.RemoteReactSelectWrapper),
    { ssr: false }
);

export default RemoteReactSelectWrapper;
