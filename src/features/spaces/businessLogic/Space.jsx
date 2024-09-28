class Space {
  constructor(id, name, capacity) {
    this.id = id;
    this.name = name;
    this.capacity = capacity;
  }
  // Getter
  get area() {
    return this.calcArea();
  }
  // Method
  calcArea() {
    return this.height * this.width;
  }
  *getSides() {
    yield this.height;
    yield this.width;
    yield this.height;
    yield this.width;
  }
}

export default Space;
