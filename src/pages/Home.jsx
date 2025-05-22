import { Layout } from 'antd';
import Header from '../components/Header';
import Banner from '../components/ModelViewer';
import MyContent from '../components/Content';
import Doc from '../components/Document';
const Home = () => {
    return (
        <Layout>
            <Header />
            <Banner nameitem={"1747269750691"} />
            <MyContent />
            <Doc />
        </Layout >
    );
};

export default Home;