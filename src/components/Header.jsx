import React, { useState, useEffect } from 'react';
import { Layout, Menu, Dropdown, Button } from 'antd';
import { DownOutlined, MenuOutlined, UnorderedListOutlined } from '@ant-design/icons';
import theme from '../settings/theme';

const { Header } = Layout;

const menuItems = [
    { key: '1', label: 'Home' },
    { key: '2', label: 'Quá Trình' },
    { key: '3', label: 'Tài Liệu' }
];

const MyHeader = ({ scrollToHome, scrollToProcess, scrollToDocuments }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Xử lý sự kiện scroll và resize
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        const handleResize = () => setIsMobile(window.innerWidth < 768);

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Hàm xử lý khi bấm nút/menu
    const handleMenuClick = (key) => {
        switch (key) {
            case '1':
                scrollToHome?.();
                break;
            case '2':
                scrollToProcess?.();
                break;
            case '3':
                scrollToDocuments?.();
                break;
            default:
                break;
        }
    };

    // Menu cho mobile
    const dropdownMenu = (
        <Menu
            onClick={({ key }) => handleMenuClick(key)}
            items={menuItems}
        />
    );

    return (
        <Layout>
            <Header
                style={{
                    height: '40px',
                    lineHeight: '40px',
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
                        fontSize: 16,
                        lineHeight: '40px',
                        transition: 'color 0.3s ease',
                    }}
                >
                    HK.TRAN
                </div>
                {/* Menu cho PC và Mobile */}
                {!isMobile ? (
                    <div style={{ display: 'flex', gap: '12px' }}>
                        {menuItems.map(item => (
                            <Button
                                key={item.key}
                                type="text"
                                size="small"
                                onClick={() => handleMenuClick(item.key)}
                                style={{
                                    color: scrolled ? theme.header.text.scrolled : theme.header.text.default,
                                    transition: 'color 0.3s ease',
                                    padding: 0,
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </div>
                ) : (
                    <Dropdown overlay={dropdownMenu} placement="bottomRight">
                        <Button
                            type="text"
                            size="small"
                            style={{
                                color: scrolled ? theme.header.text.scrolled : theme.header.text.default,
                                transition: 'color 0.3s ease',
                                padding: 0,
                                fontSize: '25px'
                            }}
                        >
                            <MenuOutlined />
                        </Button>
                    </Dropdown>
                )}
            </Header>
        </Layout>
    );
};

export default MyHeader;
