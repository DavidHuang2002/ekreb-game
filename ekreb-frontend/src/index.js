import dva from 'dva';
import './index.less';
import createLoading from 'dva-loading';
import 'antd/dist/antd.css';


// 1. Initialize
const app = dva();

// 2. Plugins
// use loading plugin
app.use(createLoading());


// 3. Model
app.model(require('./models/game').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
