import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ModelFirst = ({ plyPath, texturePath, autoCenter = true, invertRotation = false }) => {
    const mountRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const sceneRef = useRef(null);
    const meshRef = useRef(null);
    const modelGroupRef = useRef(null);
    const [vrEnabled, setVrEnabled] = useState(false);

    useEffect(() => {
        const scene = new THREE.Scene();
        sceneRef.current = scene;
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Aspect ratio will be updated
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        rendererRef.current = renderer;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x000000, 0); // Transparent background
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        mountRef.current.appendChild(renderer.domElement);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 50;
        scene.add(directionalLight);

        const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
        hemisphereLight.position.set(0, 1, 0);
        scene.add(hemisphereLight);

        let controls;
        let distance = 10;

        const modelGroup = new THREE.Group();
        modelGroupRef.current = modelGroup;
        scene.add(modelGroup);

        const loader = new PLYLoader();
        loader.load(
            plyPath,
            (geometry) => {
                geometry.computeVertexNormals();
                geometry.center();

                const textureLoader = new THREE.TextureLoader();
                textureLoader.load(
                    texturePath,
                    (texture) => {
                        const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
                        texture.anisotropy = maxAnisotropy;
                        texture.minFilter = THREE.LinearMipmapLinearFilter;
                        texture.magFilter = THREE.LinearFilter;

                        if (!geometry.attributes.uv) {
                            const uvs = [];
                            const pos = geometry.attributes.position;
                            for (let i = 0; i < pos.count; i++) {
                                uvs.push(i / pos.count, 0);
                            }
                            geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
                        }

                        const material = new THREE.MeshStandardMaterial({
                            map: texture,
                            metalness: 0.3,
                            roughness: 0.7,
                            side: THREE.DoubleSide,
                            transparent: true,
                            alphaTest: 0.5
                        });

                        const mesh = new THREE.Mesh(geometry, material);
                        meshRef.current = mesh;
                        mesh.castShadow = true;
                        mesh.receiveShadow = true;

                        mesh.position.set(0, 0, 0);
                        mesh.rotation.x = Math.PI;
                        mesh.scale.set(0.25, 0.25, 0.25); // Scale down to 25% of original size

                        modelGroup.add(mesh);

                        geometry.computeBoundingBox();
                        const box = geometry.boundingBox;
                        const size = box.getSize(new THREE.Vector3());
                        const maxDim = Math.max(size.x, size.y, size.z) * 0.25; // Adjust for scale

                        if (autoCenter) {
                            distance = maxDim / (2 * Math.tan(camera.fov * (Math.PI / 180) / 2));
                            camera.position.set(0, 0, distance * 1.5);
                            camera.lookAt(0, 0, 0);
                        } else {
                            camera.position.set(0, 0, 10);
                            camera.lookAt(0, 0, 0);
                        }

                        controls = new OrbitControls(camera, renderer.domElement);
                        controls.enableDamping = true;
                        controls.dampingFactor = 0.1;
                        controls.screenSpacePanning = true;
                        controls.enableZoom = false; // Disable zoom
                        controls.enablePan = true;
                        controls.panSpeed = 1.5;
                        controls.rotateSpeed = 1.2;
                        controls.autoRotate = true; // Enable auto-rotation
                        controls.autoRotateSpeed = 2.0; // Speed of auto-rotation (degrees per second)
                        controls.target.set(0, 0, 0);
                        controls.update();
                    },
                    undefined,
                    (err) => console.error('Error loading texture:', err)
                );
            },
            undefined,
            (err) => console.error('Error loading PLY:', err)
        );

        let touchStart = null;
        let lastTouch = null;

        const handleTouchStart = (event) => {
            if (vrEnabled && event.touches.length === 2) {
                touchStart = {
                    x1: event.touches[0].clientX,
                    y1: event.touches[0].clientY,
                    x2: event.touches[1].clientX,
                    y2: event.touches[1].clientY,
                };
                lastTouch = touchStart;
            }
        };

        const handleTouchMove = (event) => {
            if (vrEnabled && event.touches.length === 2 && touchStart && modelGroupRef.current) {
                const touchCurrent = {
                    x1: event.touches[0].clientX,
                    y1: event.touches[0].clientY,
                    x2: event.touches[1].clientX,
                    y2: event.touches[1].clientY,
                };

                const deltaY = (touchCurrent.y1 + touchCurrent.y2 - lastTouch.y1 - lastTouch.y2) / 2;
                const panSpeed = 0.01 * (autoCenter ? distance : 10);
                modelGroupRef.current.position.y += deltaY * panSpeed * (cameraRef.current.position.z / distance);

                lastTouch = touchCurrent;
            }
        };

        const handleTouchEnd = () => {
            touchStart = null;
            lastTouch = null;
        };

        renderer.domElement.addEventListener('touchstart', handleTouchStart);
        renderer.domElement.addEventListener('touchmove', handleTouchMove);
        renderer.domElement.addEventListener('touchend', handleTouchEnd);

        const updateRendererSize = () => {
            if (mountRef.current) {
                const parent = mountRef.current.parentElement;
                if (parent) {
                    const width = parent.clientWidth;
                    const height = parent.clientHeight;
                    renderer.setSize(width, height);
                    camera.aspect = width / height;
                    camera.updateProjectionMatrix();
                }
            }
        };

        const animate = () => {
            if (!vrEnabled && controls) controls.update();
            renderer.render(scene, camera);
        };
        renderer.setAnimationLoop(animate);

        const handleResize = () => {
            updateRendererSize();
        };
        window.addEventListener('resize', handleResize);

        // Initial size setup
        updateRendererSize();

        const handleOrientation = (event) => {
            const { alpha, beta, gamma } = event;
            if (cameraRef.current && modelGroupRef.current) {
                let radAlpha = THREE.MathUtils.degToRad(alpha || 0);
                let radBeta = THREE.MathUtils.degToRad(beta || 0);
                let radGamma = THREE.MathUtils.degToRad(gamma || 0);

                if (invertRotation) {
                    radAlpha = -radAlpha;
                    radBeta = -radBeta;
                    radGamma = -radGamma;
                }

                const adjustedBeta = radBeta - Math.PI / 2;
                const orientation = new THREE.Quaternion().setFromEuler(
                    new THREE.Euler(adjustedBeta, radAlpha, -radGamma, 'YXZ')
                );
                const portraitRotation = new THREE.Quaternion().setFromEuler(
                    new THREE.Euler(0, 0, Math.PI / 2, 'XYZ')
                );

                modelGroupRef.current.quaternion.copy(orientation.multiply(portraitRotation)).normalize();
                modelGroupRef.current.quaternion.slerp(modelGroupRef.current.quaternion, 0.1);
                cameraRef.current.lookAt(0, 0, 0);
            }
        };

        if (vrEnabled) {
            if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
                DeviceOrientationEvent.requestPermission()
                    .then((state) => {
                        if (state === 'granted') {
                            window.addEventListener('deviceorientation', handleOrientation, true);
                        }
                    })
                    .catch((err) => console.error('Error requesting device orientation permission:', err));
            } else {
                window.addEventListener('deviceorientation', handleOrientation, true);
            }
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('deviceorientation', handleOrientation);
            renderer.domElement.removeEventListener('touchstart', handleTouchStart);
            renderer.domElement.removeEventListener('touchmove', handleTouchMove);
            renderer.domElement.removeEventListener('touchend', handleTouchEnd);
            renderer.setAnimationLoop(null);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            if (meshRef.current) {
                meshRef.current.geometry.dispose();
                meshRef.current.material.dispose();
                if (meshRef.current.material.map) meshRef.current.material.map.dispose();
            }
            renderer.dispose();
            if (controls) controls.dispose();
            cameraRef.current = null;
        };
    }, [plyPath, texturePath, vrEnabled, autoCenter]);

    return (
        <div
            ref={mountRef}
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
            }}
        />
    );
};

export default ModelFirst;