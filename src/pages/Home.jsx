import React, { useState, useEffect } from 'react';
import { Layout, Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import theme from '../settings/theme';

const { Header, Content } = Layout;

const MyHeader = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const menu = (
        <Menu>
            <Menu.Item key="1">Chức năng 1</Menu.Item>
            <Menu.Item key="2">Chức năng 2</Menu.Item>
            <Menu.Item key="3">Đăng xuất</Menu.Item>
        </Menu>
    );

    return (
        <Header
            style={{
                height: '40px',
                lineHeight: '40px',
                position: 'fixed',
                zIndex: 1000,
                width: '100%',
                background: scrolled ? theme.header.background.scrolled : theme.header.background.default,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 24px',
                transition: 'background 0.3s ease, box-shadow 0.3s ease',
                boxShadow: scrolled ? theme.header.shadow.scrolled : 'none',
            }}
        >
            <div
                style={{
                    color: scrolled ? theme.header.text.scrolled : theme.header.text.default,
                    fontWeight: 'bold',
                    fontSize: 16,
                    lineHeight: '40px',
                    transition: 'color 0.3s ease',
                }}
            >
                LOGO
            </div>

            <Dropdown overlay={menu} placement="bottomRight">
                <Button
                    type="text"
                    size="small"
                    style={{
                        color: scrolled ? theme.header.text.scrolled : theme.header.text.default,
                        transition: 'color 0.3s ease',
                        lineHeight: '40px',
                        padding: 0,
                    }}
                >
                    Chức năng <DownOutlined />
                </Button>
            </Dropdown>
        </Header>
    );
};

const Home = () => {
    return (
        <Layout>
            <MyHeader />
            <Content
                style={{
                    background: `linear-gradient(135deg, ${theme.content.background.left} 0%, ${theme.content.background.right} 100%)`,
                    height: '900px',
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
                        zIndex: 10,
                    }}
                >
                    VIT3D
                </div>
            </Content>
        </Layout>
    );
};

export default Home;