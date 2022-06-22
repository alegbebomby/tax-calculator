export enum VehicleTypes{
    Car,
    Emergency,
    Bus,
    Diplomat,
    Motorcycle,
    Foreign,
    Military,
}
class Vehicle {
    private _name :string
    constructor(name:string){
        this._name = name
    }
    getVehicleType():string{
        return this._name;
    } 
}
export default Vehicle;