import React, { useState, useEffect } from 'react';
import { Layout, Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import theme from '../settings/theme';

const { Header } = Layout;

const menu = (
    <Menu>
        <Menu.Item key="1">Chức năng 1</Menu.Item>
        <Menu.Item key="2">Chức năng 2</Menu.Item>
        <Menu.Item key="3">Đăng xuất</Menu.Item>
    </Menu>
);

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

    return (
        <Layout>
            <Header
                style={{
                    height: '40px', // Thêm đơn vị 'px'
                    lineHeight: '40px', // Đảm bảo nội dung căn giữa theo chiều cao
                    position: 'fixed',
                    zIndex: 100,
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
                        fontSize: 16, // Giảm fontSize để phù hợp với header thấp hơn
                        lineHeight: '40px', // Căn chỉnh chữ theo chiều cao header
                        transition: 'color 0.3s ease',
                    }}
                >
                    LOGO
                </div>

                <Dropdown overlay={menu} placement="bottomRight">
                    <Button
                        type="text"
                        size="small" // Giảm kích thước button để vừa với header
                        style={{
                            color: scrolled ? theme.header.text.scrolled : theme.header.text.default,
                            transition: 'color 0.3s ease',
                            lineHeight: '40px', // Căn chỉnh button theo chiều cao header
                            padding: 0, // Loại bỏ padding mặc định của button
                        }}
                    >
                        Chức năng <DownOutlined />
                    </Button>
                </Dropdown>
            </Header>
        </Layout>
    );
};

export default MyHeader;