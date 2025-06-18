import { Layout } from 'antd';
import Header from '../components/Header';
import Banner from '../components/ModelViewer';
import MyContent from '../components/Content';
import Doc from '../components/Document';
import { useRef } from 'react';

const Home = () => {
    const homeRef = useRef(null);
    const processRef = useRef(null);
    const docRef = useRef(null);

    const scrollToHome = () => homeRef.current?.scrollIntoView({ behavior: 'smooth' });
    const scrollToProcess = () => {
        if (processRef.current) {
            const offsetTop = processRef.current.offsetTop;
            window.scrollTo({
                top: offsetTop - 200,
                behavior: 'smooth',
            });
        }
    };
    const scrollToDocuments = () => {
        if (docRef.current) {
            const offsetTop = docRef.current.offsetTop;
            window.scrollTo({
                top: offsetTop - 100,
                behavior: 'smooth',
            });
        }
    }
    return (
        <Layout>
            <Header
                scrollToHome={scrollToHome}
                scrollToProcess={scrollToProcess}
                scrollToDocuments={scrollToDocuments}
            />
            <div ref={homeRef}><Banner nameitem={"1747269750691"} /></div>
            <div ref={processRef}><MyContent /></div>
            <div ref={docRef}><Doc /></div>
        </Layout>
    );
};

export default Home;
