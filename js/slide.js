export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.dis = {
      finalPosition: 0,
      startX: 0,
      movement: 0,
    };
  }
  moveSlide(distX) {
    this.dis.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }
  updatePosition(clientX) {
    this.dis.movement = (this.dis.startX - clientX) * 1.6;
    return this.dis.finalPosition - this.dis.movement;
  }
  onStart(event) {
    let movetype;
    if (event.type === "mousedown") {
      event.preventDefault();
      this.dis.startX = event.clientX;
      movetype = "mousemove";
    } else {
      this.dis.startX = event.changedTouches[0].clientX;
      movetype = "touchmove";
    }
    console.log(movetype);
    this.wrapper.addEventListener(movetype, this.onMove);
  }
  addSlideEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
    this.wrapper.addEventListener("touchstart", this.onEnd);
    this.wrapper.addEventListener("touchend", this.onEnd);
  }
  onMove(event) {
    const pointerPosition =
      event.type === "mousemove"
        ? event.clientX
        : event.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    const movetype = (event.type === "mouseup") ? 'mousemove' : 'touchmove'
    this.wrapper.removeEventListener(movetype, this.onMove);
    this.dis.finalPosition = this.dis.movePosition;
  }
  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }
  init() {
    this.bindEvents();
    this.addSlideEvents();
    return this;
  }
}
