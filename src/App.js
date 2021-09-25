import './App.css';
import {
	Component
} from "react";

import ThreeDViewer from './components/ThreeDViewer/ThreeDViewer';

class App extends Component {
	
	render() {
		return (
			<div className="App">
				<ThreeDViewer product="ARCHIBALDCHAIR" rotationSpeed="normal" />
				<p>
					Drag image for 3D effect
				</p>
			</div>
		);
	}
}

export default App;
