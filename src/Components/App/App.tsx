import "./App.css"
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Body from '../Body/Body'
import Notification from '../Notification/Notification';

function App() {
  return (
    <div className="App">
      <Notification/>
      <Header/>
      <Body/>
      <Footer/>
    </div>
  );
}

export default App;
