import React from 'react';
import { Layout } from 'antd';
import theme from '../settings/theme';
import ModelFirst from './ModelFirst';
import { ArrowsAltOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

const Banner = ({ nameitem }) => {
    const navigate = useNavigate();
    return (
        <Content
            style={{
                background: `linear-gradient(135deg, ${theme.content.background.left} 0%, ${theme.content.background.right} 100%)`,
                height: '800px',
                paddingTop: '80px',
                position: 'relative',
                zIndex: 1,
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: '20%',
                    left: '28%',
                    transform: 'translate(-50%, -50%)',
                    color: theme.content.color.VIT3D,
                    fontSize: '300px',
                    rotate: '-20deg',
                    fontWeight: 900,
                    textAlign: 'center',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                    zIndex: 0,
                }}
            >
                VIT3D
            </div>
            <div
                style={{
                    width: '400px',
                    height: '400px',
                    position: 'absolute',
                    top: '0px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    position: 'relative',
                }}
            >
                <ModelFirst
                    plyPath={`/plys/${nameitem}.ply`}
                    texturePath={`/png/${nameitem}0.png`}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '20px',
                        right: '20px',
                        backgroundColor: '#165576',
                        borderRadius: '50px',
                        width: '80px',
                        height: '40px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        fontSize: '22px',
                        zIndex: 2,
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        navigate(`/${nameitem}.ply`);
                    }}
                >
                    {/* <ArrowUpOutlined style={{ marginLeft: '8px' }} /> */}
                    <ArrowsAltOutlined />
                </div>
            </div>
        </Content>
    );
};

export default Banner;