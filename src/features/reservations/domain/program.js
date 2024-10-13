export class Program{
  constructor(data){
    this.id = data.name,
    this.name = data.name
  }
  get initials(){
    return this.name.match(/[A-Z]/g).join("");
  }
}