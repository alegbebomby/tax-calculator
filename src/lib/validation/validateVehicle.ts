import { VehicleTypes } from './../types/vehicle';
export function validateVehicle(vehicle: string){
    return (Object.values(VehicleTypes) as string[]).includes(vehicle);
}

