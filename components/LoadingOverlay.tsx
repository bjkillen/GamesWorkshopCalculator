import React from 'react';
import { ActivityIndicator, MD2Colors, Portal } from 'react-native-paper';

export interface LoadingOverlayProps {
    open: boolean;
}

function LoadingOverlay(props: LoadingOverlayProps) {
    const { open } = props;

    return (
        <Portal>
            <ActivityIndicator animating={open} color={MD2Colors.red800} />
        </Portal>
    );
}

export default LoadingOverlay;
