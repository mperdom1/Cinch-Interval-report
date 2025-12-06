import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LoadingScreen: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-green-50 flex flex-col items-center justify-center z-50">
            <DotLottieReact
                src="https://lottie.host/d155296f-ffbb-4155-aa6b-b369e9dc9b6e/r43Tyadw8j.lottie"
                loop
                autoplay
                style={{ width: '200px', height: '200px' }}
            />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">CINCH Interval Staffing</h3>
            <p className="mt-2 text-sm text-gray-600">Loading your dashboard...</p>
        </div>
    );
};

export default LoadingScreen;
