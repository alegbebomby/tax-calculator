import { defaultPublicHolidays, defaultTimeConfig } from "./types/defaultValues";
import { TimeConfig } from "./types/TimeConfig";
import Vehicle from "./types/vehicle";

enum TollFreeVehicles {
    Emergency,
    Bus,
    Diplomat,
    Motorcycle,
    Foreign,
    Military,
}
/**
 * if vehicle is tollFree
 * @param vehicle 
 * @returns boolean
 */
function isTollFreeVehicle(vehicle: Vehicle): boolean {
    if (vehicle == null) return false;
    const vehicleType: string = vehicle.getVehicleType();
    return (Object.values(TollFreeVehicles) as string[]).includes(vehicleType);
}

function getTollFee(date: Date, vehicle: Vehicle, timeConfig: Array<TimeConfig> = defaultTimeConfig, publicHolidays: Array<string> = defaultPublicHolidays): number {
    if (isTollFreeDate(date, publicHolidays) || isTollFreeVehicle(vehicle)) return 0;
    for (let t of timeConfig) {
        if (withInTime(date, t.timeInterval)) {
            return t.amount
        }
    }
    return 0
}

function withInTime(date: Date, dateString: string): boolean {
    const startTime = dateString.split('-')[0]
    const endTime = dateString.split('-')[1]

    const startDate = new Date(date.getTime());
    startDate.setHours(Number(startTime.split(":")[0]));
    startDate.setMinutes(Number(startTime.split(":")[1]));

    const endDate = new Date(date.getTime());
    endDate.setHours(Number(endTime.split(":")[0]));
    endDate.setMinutes(Number(endTime.split(":")[1]));

    return startDate <= date && date <= endDate
}

function isTollFreeDate(date: Date, publicHolidays: Array<string> = defaultPublicHolidays): boolean {
    const month: number = date.getMonth()
    const day: number = date.getDay();
    const dayOfMonth: number = date.getDate();

    if (day == 6 || day == 0) return true;
    for (let publicHoliday of publicHolidays) {
        const publicHolidayDate = new Date(publicHoliday)
        const publicHolidayDateMonth = publicHolidayDate.getMonth()
        const publicHolidayDateMonthdayOfMonth: number = publicHolidayDate.getDate();
        if (month == publicHolidayDateMonth && dayOfMonth == publicHolidayDateMonthdayOfMonth) return true

        const dayBefore = getPreviousDay(publicHolidayDate)
        const dayBeforeDateMonth = dayBefore.getMonth()
        const dayBeforeDateMonthdayOfMonth: number = dayBefore.getDate();

        if (month == dayBeforeDateMonth && dayOfMonth == dayBeforeDateMonthdayOfMonth) return true
    }
    console.log('not public')
    return false

}

function getPreviousDay(date: Date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
    return previous;
}
export function getTax(vehicle: Vehicle, dates: Date[]): number {
    let intervalStart: Date = dates[0];
    let intervalDayStart: Date = dates[0];
    let firstFee = getTollFee(intervalStart, vehicle);
    let totalFeePerHour: number = firstFee;
    const amountPerDay:any ={}
    for (let i = 1; i < dates.length; i++) {
        const date: Date = dates[i];
        let nextFee: number = getTollFee(date, vehicle);
        let diffInMillies = date.getTime() - intervalStart.getTime();
        console.log(diffInMillies)
        let minutes = diffInMillies / 1000 / 60;
        if (minutes <= 60) {
            if (nextFee > totalFeePerHour) {
                totalFeePerHour = nextFee;
                continue
            }
        }
        totalFeePerHour = nextFee;
        intervalStart = dates[i].getTime() > intervalStart.getTime() ? dates[i] : intervalStart
        if(amountPerDay[dates[i].toDateString()]){
            amountPerDay[dates[i].toDateString()].push(totalFeePerHour) 
        }else{
            amountPerDay[dates[i].toDateString()] = [totalFeePerHour]
        }
    }
    console.log(amountPerDay)
    let total = 0 
    for(let totalPerday in amountPerDay ){
        const sum  = amountPerDay[totalPerday].reduce((pervious: any, present: any) => {
            return pervious >= 60?  60 : pervious + present;
        } ,0)
        console.log(sum)
        total+=sum
    }

    return total;
}