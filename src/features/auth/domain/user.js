export class User {
  constructor(data){
    this.id = data.id,
    this.names = data.names,
    this.paternalName = data.paternalName,
    this.maternalName = data.maternalName,
    this.email = data.email,
    this.job = data.job,
    this.rol = data.rol
  }

  get fullname(){
    return `${this.names} ${this.paternalName} ${this.maternalName}`
  }
}