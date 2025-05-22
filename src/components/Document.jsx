import React, { useState, useRef } from 'react';
import { Col, Row, Carousel, Button, Card, Typography, Space, Divider, Tag } from 'antd';
import { LeftOutlined, RightOutlined, DownloadOutlined, FileTextOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';

const { Title, Text, Paragraph } = Typography;

const Doc = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = useRef(null);

    // List of JPG files (relative paths from the public folder)
    const slides = [
        '/images/bia.jpg',
        '/images/slide1.jpg',
        '/images/slide2.jpg',
        '/images/slide3.jpg',
        '/images/slide4.jpg',
        '/images/slide5.jpg',
        '/images/slide6.jpg',
    ];

    // Handle previous slide
    const handlePrev = () => {
        if (currentSlide > 0) {
            carouselRef.current.prev();
            setCurrentSlide((prev) => prev - 1);
        }
    };

    // Handle next slide
    const handleNext = () => {
        if (currentSlide < slides.length - 1) {
            carouselRef.current.next();
            setCurrentSlide((prev) => prev + 1);
        }
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #a4dcfe 100%)',
                padding: '40px 20px',
                marginTop: "-100px"
            }}
        >
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <Title
                    level={1}
                    style={{
                        textAlign: 'center',
                        color: 'white',
                        marginBottom: '40px',
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }}
                >
                    Tài Liệu Học Tập
                </Title>

                <Row gutter={[32, 32]} justify="center" align="top">
                    <Col xs={24} lg={14}>
                        <Card
                            style={{
                                borderRadius: '6px',
                                boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                                border: 'none',
                                overflow: 'hidden'
                            }}
                            bodyStyle={{ padding: '24px' }}
                        >
                            <Title level={3} style={{ textAlign: 'center', marginBottom: '24px', color: '#1f2937' }}>
                                <FileTextOutlined style={{ marginRight: '8px', color: '#3b82f6' }} />
                                Bài Thuyết Trình
                            </Title>

                            <div style={{ position: 'relative' }}>
                                <Carousel
                                    ref={carouselRef}
                                    afterChange={(current) => setCurrentSlide(current)}
                                    autoplay
                                    autoplaySpeed={4000}
                                    dots={{
                                        className: 'custom-dots'
                                    }}
                                    style={{
                                        borderRadius: '6px',
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    {slides.map((slide, index) => (
                                        <div key={index}>
                                            <img
                                                src={slide}
                                                alt={`Slide ${index + 1}`}
                                                style={{
                                                    width: '100%',
                                                    objectFit: 'cover',
                                                    borderRadius: '6px'
                                                }}
                                            />
                                        </div>
                                    ))}
                                </Carousel>
                            </div>

                            <Divider />

                            <Row justify="space-between" align="middle" style={{ marginTop: '16px' }}>
                                <Col>
                                    <Button
                                        type="primary"
                                        icon={<LeftOutlined />}
                                        onClick={handlePrev}
                                        disabled={currentSlide === 0}
                                        size="large"
                                        style={{
                                            borderRadius: '8px',
                                            height: '40px',
                                            minWidth: '60px'
                                        }}
                                    >
                                    </Button>
                                </Col>

                                <Col>
                                    <Tag
                                        color="blue"
                                        style={{
                                            fontSize: '16px',
                                            padding: '8px 16px',
                                            borderRadius: '20px',
                                            fontWeight: '600'
                                        }}
                                    >
                                        {currentSlide + 1} / {slides.length}
                                    </Tag>
                                </Col>

                                <Col>
                                    <Button
                                        type="primary"
                                        icon={<RightOutlined />}
                                        onClick={handleNext}
                                        disabled={currentSlide === slides.length - 1}
                                        size="large"
                                        iconPosition="end"
                                        style={{
                                            borderRadius: '8px',
                                            height: '40px',
                                            minWidth: '60px'
                                        }}
                                    >
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                    {/* Document Info Section */}
                    <Col xs={24} lg={10}>
                        <Card
                            style={{
                                borderRadius: '6px',
                                boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                                border: 'none',
                                height: 'fit-content'
                            }}
                            bodyStyle={{ padding: '32px' }}
                        >
                            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <Title level={3} style={{ marginBottom: '0', color: '#1f2937' }}>
                                        Giáo Trình Chuyên Ngành
                                    </Title>
                                </div>

                                <Row gutter={[16, 16]} align="top">
                                    {/* Left side - Image */}
                                    <Col xs={10} sm={10}>
                                        <div style={{ textAlign: 'center' }}>
                                            <img
                                                src="/images/bia.jpg"
                                                alt="Bìa tài liệu"
                                                style={{
                                                    width: '100%',
                                                    maxWidth: '180px',
                                                    height: '220px',
                                                    objectFit: 'cover',
                                                    borderRadius: '12px',
                                                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                                                    border: '3px solid #f0f0f0'
                                                }}
                                            />
                                        </div>
                                    </Col>

                                    {/* Right side - Info */}
                                    <Col xs={14} sm={14}>
                                        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                                            <div>
                                                <Paragraph style={{ fontSize: '14px', lineHeight: '1.5', color: '#6b7280', marginBottom: '16px' }}>
                                                    Tài liệu học tập chất lượng cao được biên soạn bởi đội ngũ giảng viên
                                                    giàu kinh nghiệm.
                                                </Paragraph>

                                                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <Text strong style={{ color: '#374151', minWidth: '80px', fontSize: '13px' }}>📚 Môn học:</Text>
                                                        <Text style={{ color: '#6b7280', fontSize: '13px' }}>Công nghệ thông tin</Text>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <Text strong style={{ color: '#374151', minWidth: '80px', fontSize: '13px' }}>📅 Năm học:</Text>
                                                        <Text style={{ color: '#6b7280', fontSize: '13px' }}>2024-2025</Text>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <Text strong style={{ color: '#374151', minWidth: '80px', fontSize: '13px' }}>👨‍🏫 Giảng viên:</Text>
                                                        <Text style={{ color: '#6b7280', fontSize: '13px' }}>TS. Nguyễn Văn A</Text>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <Text strong style={{ color: '#374151', minWidth: '80px', fontSize: '13px' }}>📄 Trang:</Text>
                                                        <Text style={{ color: '#6b7280', fontSize: '13px' }}>156 trang</Text>
                                                    </div>
                                                </Space>
                                            </div>
                                        </Space>
                                    </Col>
                                </Row>
                                <Button
                                    type="primary"
                                    size="large"
                                    icon={<DownloadOutlined />}
                                    block
                                    style={{
                                        height: '50px',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        borderRadius: '12px',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        border: 'none',
                                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
                                    }}
                                    href="/GiaoTrinh/done.pdf"
                                    download="done.pdf"
                                >
                                    Tải Xuống Tài Liệu PDF
                                </Button>
                            </Space>
                        </Card>
                    </Col>
                </Row>
            </div>

            <style jsx>{`
                .custom-dots .slick-dots li button {
                    background: #d1d5db !important;
                    border-radius: 50% !important;
                    width: 12px !important;
                    height: 12px !important;
                }
                
                .custom-dots .slick-dots li.slick-active button {
                    background: #3b82f6 !important;
                }
                
                .ant-carousel .slick-prev,
                .ant-carousel .slick-next {
                    color: #3b82f6;
                    font-size: 20px;
                    background: rgba(255, 255, 255, 0.9);
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex !important;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                }
                
                .ant-carousel .slick-prev:hover,
                .ant-carousel .slick-next:hover {
                    background: rgba(255, 255, 255, 1);
                }
            `}</style>
        </div>
    );
};

export default Doc;