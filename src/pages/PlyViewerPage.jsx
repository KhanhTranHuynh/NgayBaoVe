// import React, { useEffect, useRef, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import PlyViewer from '../components/PlyViewer';

// const PlyViewerPage = () => {
//     const { plyFileName } = useParams();
//     const plyPath = `/plys/${plyFileName}`;
//     const texturePath = `/png/${plyFileName.replace(".ply", "0.png")}`;
//     const videoRef = useRef(null);
//     const [orientation, setOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });
//     const [cameraError, setCameraError] = useState(null);

//     useEffect(() => {
//         const handleOrientation = (event) => {
//             setOrientation({
//                 alpha: event.alpha || 0,
//                 beta: event.beta || 0,
//                 gamma: event.gamma || 0,
//             });
//         };

//         if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
//             DeviceOrientationEvent.requestPermission()
//                 .then((state) => {
//                     if (state === 'granted') {
//                         window.addEventListener('deviceorientation', handleOrientation, true);
//                     } else {
//                         console.warn('Device orientation permission denied');
//                     }
//                 })
//                 .catch((err) => console.error('Error requesting orientation permission:', err));
//         } else {
//             window.addEventListener('deviceorientation', handleOrientation, true);
//         }

//         return () => {
//             window.removeEventListener('deviceorientation', handleOrientation);
//         };
//     }, []);

//     useEffect(() => {
//         const initializeCamera = async () => {
//             try {
//                 const constraints = {
//                     video: { facingMode: { exact: 'environment' } },
//                     audio: false,
//                 };

//                 let stream = await navigator.mediaDevices.getUserMedia(constraints);
//                 if (videoRef.current) {
//                     videoRef.current.srcObject = stream;
//                     videoRef.current.muted = true;
//                     await videoRef.current.play();
//                 }
//             } catch (err) {
//                 console.warn('Failed to open environment-facing camera:', err);
//                 try {
//                     const fallbackConstraints = { video: true, audio: false };
//                     let stream = await navigator.mediaDevices.getUserMedia(fallbackConstraints);
//                     if (videoRef.current) {
//                         videoRef.current.srcObject = stream;
//                         videoRef.current.muted = true;
//                         await videoRef.current.play();
//                     }
//                 } catch (err2) {
//                     setCameraError('Không thể mở camera: ' + err2.message);
//                     console.error('Failed to open any camera:', err2);
//                 }
//             }
//         };

//         initializeCamera();

//         return () => {
//             if (videoRef.current && videoRef.current.srcObject) {
//                 videoRef.current.srcObject.getTracks().forEach(track => track.stop());
//             }
//         };
//     }, []);

//     const captureVideoFrame = () => {
//         if (!videoRef.current) return null;

//         const canvas = document.createElement('canvas');
//         canvas.width = videoRef.current.videoWidth;
//         canvas.height = videoRef.current.videoHeight;
//         const ctx = canvas.getContext('2d');
//         ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
//         const dataURL = canvas.toDataURL('image/png');
//         return dataURL;
//     };

//     return (
//         <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
//             {cameraError && (
//                 <div
//                     style={{
//                         position: 'absolute',
//                         top: 20,
//                         left: 20,
//                         background: 'rgba(255, 0, 0, 0.8)',
//                         color: 'white',
//                         padding: '10px',
//                         borderRadius: '8px',
//                         zIndex: 20,
//                     }}
//                 >
//                     {cameraError}
//                 </div>
//             )}

//             <video
//                 ref={videoRef}
//                 style={{
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     width: '100%',
//                     height: '100%',
//                     objectFit: 'cover',
//                     zIndex: 1,
//                     filter: 'brightness(0.7)',
//                 }}
//                 playsInline
//                 muted
//                 autoPlay
//             />

//             <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5 }}>
//                 <PlyViewer
//                     plyPath={plyPath}
//                     texturePath={texturePath}
//                     autoCenter={true}
//                     invertRotation={false}
//                     orientation={orientation}
//                     captureVideoFrame={captureVideoFrame}
//                 />
//             </div>
//         </div>
//     );
// };

// export default PlyViewerPage;

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlyViewer from '../components/PlyViewer';

const PlyViewerPage = () => {
    const { plyFileName } = useParams();
    const plyPath = `/plys/${plyFileName}`;
    const texturePath = `/png/${plyFileName.replace(".ply", "0.png")}`;
    const videoRef = useRef(null);
    const [cameraError, setCameraError] = useState(null);

    useEffect(() => {
        const initializeCamera = async () => {
            try {
                const constraints = {
                    video: { facingMode: { exact: 'environment' } },
                    audio: false,
                };

                let stream = await navigator.mediaDevices.getUserMedia(constraints);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.muted = true;
                    await videoRef.current.play();
                }
            } catch (err) {
                console.warn('Failed to open environment-facing camera:', err);
                try {
                    const fallbackConstraints = { video: true, audio: false };
                    let stream = await navigator.mediaDevices.getUserMedia(fallbackConstraints);
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        videoRef.current.muted = true;
                        await videoRef.current.play();
                    }
                } catch (err2) {
                    setCameraError('Không thể mở camera: ' + err2.message);
                    console.error('Failed to open any camera:', err2);
                }
            }
        };

        initializeCamera();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const captureVideoFrame = () => {
        if (!videoRef.current) return null;

        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL('image/png');
        return dataURL;
    };

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
            {cameraError && (
                <div
                    style={{
                        position: 'absolute',
                        top: 20,
                        left: 20,
                        background: 'rgba(255, 0, 0, 0.8)',
                        color: 'white',
                        padding: '10px',
                        borderRadius: '8px',
                        zIndex: 20,
                    }}
                >
                    {cameraError}
                </div>
            )}

            <video
                ref={videoRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 1,
                    filter: 'brightness(0.7)',
                }}
                playsInline
                muted
                autoPlay
            />

            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5 }}>
                <PlyViewer
                    plyPath={plyPath}
                    texturePath={texturePath}
                    autoCenter={true}
                    invertRotation={false}
                    captureVideoFrame={captureVideoFrame}
                />
            </div>
        </div>
    );
};

export default PlyViewerPage;