export class User {
  constructor(data){
    this.id = data?.id,
    this.names = data?.names,
    this.paternalName = data?.paternalName,
    this.maternalName = data?.maternalName,
    this.email = data?.email,
    this.job = data?.job,
    this.roles = data?.roles
  }

  get fullname(){
    return `${this.names} ${this.paternalName} ${this.maternalName}`
  }

  get isCoordinator(){
    return Object.values(this.roles).some(role => role.id === 1);
  }
  
}