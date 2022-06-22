import { TimeConfig } from './TimeConfig';
export interface ConfigObject{
    maxAmountPerDay: number
    timeConfig: Array<TimeConfig>
    publicHolidays: Array<string>

}