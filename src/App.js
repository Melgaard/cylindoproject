import './App.css';
import {
	Component
} from "react";

import { Archibald } from './connection/products';

class App extends Component {
	constructor(props){
		super(props);
		this.state = { 
			image: null,
		};
	}

	currImage = 1;
	startX = 0;
	imageDictionary = {};

	async componentDidMount() {
		this.cacheImages();
		this.updateImage(this.currImage);
	}

	cacheImages() {
		for (let i = 1; i <= 32; i++) {
			Archibald(i).then((img) => {
				this.imageDictionary[i] = img;
			})
		}
	}

	async updateImage(imageNumber) {
		//If image is cached already, use it.
		if (this.imageDictionary[imageNumber]) {
			this.setState({ image: this.imageDictionary[imageNumber] });
			return;
		}

		const img = await Archibald(imageNumber);
		this.imageDictionary[imageNumber] = img;
		this.setState({ image: img });
	}

	onDragStart(event) {
		this.startX = event.clientX;
	}

	onDrag(event) {

		//Fix for bug with onDrag being triggered on stop drag stop. TODO: Figure out why and make longterm fix
		if (event.screenX === 0 && event.screenY === 0) return;

		const diff = event.clientX - this.startX;
		const imagesToRotate = Math.trunc(diff / 25); //One image per 25 pixel, this should probably be variable and not hardcoded

		let imageToShow = (((imagesToRotate + this.currImage) % 32) + 32) % 32; //Make sure the image is the correct one between 0-31
		if (imageToShow === 0) imageToShow = 32; //API is not 0-indexed so convert a 0 to 32

		this.updateImage(imageToShow);
	}

	zoomImage() {
		console.log('Zoom not implemented');
	}


	render() {
		const { image } = this.state;
		return (
			<div className="App">
				<div className="dragWrapper">
					<div className="dragElem" draggable="true" onDrag={(event) => this.onDrag(event)} onDragStart={(event) => this.onDragStart(event)} ></div>
					<img draggable="false" src={image} className="dragImage" alt="imageOfChair" />
				</div>
				<p>
					Drag image for 3D effect
				</p>
			</div>
		);
	}
}

export default App;
