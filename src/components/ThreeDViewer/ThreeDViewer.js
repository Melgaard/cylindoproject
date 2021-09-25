import './ThreeDViewer.css';
import { Component } from "react";

import { GetProductFrames } from '../../connection/products';

class ThreeDViewer extends Component {
	
	currImage = 1;
	startX = 0;
	imageDictionary = {};
	product = null;
	rotationSpeed = 25;

	constructor(props){
		super(props);
		this.state = { 
			image: null,
		};
		this.product = props.product

		if (props.rotationSpeed === 'fast') this.rotationSpeed = 10;
		if (props.rotationSpeed === 'normal') this.rotationSpeed = 25;
		if (props.rotationSpeed === 'slow') this.rotationSpeed = 50;
	}



	async componentDidMount() {
		this.cacheImages();
		this.updateImage(this.currImage);
	}

	cacheImages() {
		//TODO: 32 is hardcoded and doesn't tolerate other number of total images. Find solution to get it dynamically, perhaps from an endpoint
		for (let i = 1; i <= 32; i++) {
			GetProductFrames(this.product, i).then((img) => {
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

		const img = await GetProductFrames(this.product, imageNumber);
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
		const imagesToRotate = Math.trunc(diff / this.rotationSpeed);

		//TODO: 32 is hardcoded and doesn't tolerate other number of total images. Find solution to get it dynamically, perhaps from an endpoint
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
			<div className="ThreeDViewer">
				<div className="dragWrapper">
					<div className="dragElem" draggable="true" onDrag={(event) => this.onDrag(event)} onDragStart={(event) => this.onDragStart(event)} ></div>
					<img draggable="false" src={image} className="dragImage" alt="imageOfChair" />
				</div>
			</div>
		);
	}
}

export default ThreeDViewer;
