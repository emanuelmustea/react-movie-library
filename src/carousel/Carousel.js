import React, { Component } from 'react';
import './Carousel.css';

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = { isSliding: false, isAnimating: false, currentImageIndex: 0, disableSliding: false };
    this.prevPhoto = this.prevPhoto.bind(this);
    this.nextPhoto = this.nextPhoto.bind(this);
    this.imgs = this.cloneImages(this.props.imgs);
  }
  autoSlideNextPhoto = () => {
    console.log(this.props);
    const { slideAfter } = this.props;
    if (!this.state.disableSliding) {
      this.nextPhoto();
    } else {
      this.setState({ disableSliding: false });
    }
    setTimeout(this.autoSlideNextPhoto, slideAfter);
  };
  cloneImages(imgs) {
    const firstImage = imgs[0];
    const lastImage = imgs[imgs.length - 1];
    return [lastImage, ...imgs, firstImage];
  }
  enableButtons() {
    const { transitionDuration } = this.props;
    setTimeout(() => {
      this.setState({
        isSliding: false
      });
    }, transitionDuration);
  }
  disableButtons() {
    this.setState({
      isSliding: true
    });
    this.enableButtons();
  }
  isTheLastImage(direction) {
    const imagesCount = this.props.imgs.length;
    if (direction === 'next' && this.state.currentImageIndex >= imagesCount) {
      return true;
    } else if (direction === 'prev' && this.state.currentImageIndex <= 1) {
      return true;
    }
    return false;
  }

  moveSliderContainer(direction = 'next') {
    if (this.state.isSliding) {
      return;
    }
    const imagesCount = this.props.imgs.length;
    const currentImageIndex = direction === 'next' ? this.state.currentImageIndex + 1 : this.state.currentImageIndex - 1;
    const { transitionDuration } = this.props;

    this.setState({ currentImageIndex, isAnimating: true, disableSliding: true });

    if (this.isTheLastImage(direction)) {
      setTimeout(() => {
        const currentImageIndex = direction === 'next' ? 1 : imagesCount;
        this.setState({ currentImageIndex, isAnimating: false });
      }, transitionDuration);
    }
    this.disableButtons();
  }

  nextPhoto() {
    this.moveSliderContainer('next');
  }
  prevPhoto() {
    this.moveSliderContainer('prev');
  }
  componentDidMount() {
    this.carouselContainerWidth = this.carouselElement.offsetWidth;
    this.setState({ currentImageIndex: 1 });
    if (this.props.autoSlide) {
      setTimeout(this.autoSlideNextPhoto, this.props.slideAfter);
    }
  }
  render() {
    const { transitionDuration } = this.props;
    const sliderTransition = this.state.isAnimating ? `${transitionDuration}ms` : '0ms';
    const imgsElements = this.imgs.map((src, i) => <img src={src} key={i} />);
    const disabledClass = this.state.isSliding ? 'disabled' : '';
    const sliderLeftPosition = -1 * this.state.currentImageIndex * (this.carouselContainerWidth || 0);
    return (
      <div className="carousel" ref={ref => (this.carouselElement = ref)}>
        <div className="slider" style={{ left: sliderLeftPosition, transitionDuration: sliderTransition }}>
          {imgsElements}
        </div>
        <button className={[`prev ${disabledClass}`]} onClick={this.prevPhoto} />
        <button className={[`next ${disabledClass}`]} onClick={this.nextPhoto} />
      </div>
    );
  }
}