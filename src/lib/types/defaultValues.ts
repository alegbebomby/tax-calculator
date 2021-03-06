import { TimeConfig } from "./TimeConfig"

export const defaultPublicHolidays =[
    '2013-01-01',
    '2013-01-06',
    '2013-03-29',
    '2013-03-31',
    '2013-04-01',
    '2013-05-01',
    '2013-05-09',
    '2013-06-06',
    '2013-06-22',
    '2013-11-02',
    '2013-12-24',
    '2013-12-25',
    '2013-12-26',
    '2013-12-31',
 ]
 
 export const defaultTimeConfig: Array<TimeConfig> = [
 {timeInterval: "00:00-05:59", amount:  0},
 {timeInterval: "06:00-06:29", amount:  8 },
 {timeInterval: "06:30-06:59", amount:  13},
 {timeInterval: "07:00-07:59", amount:  18},
 {timeInterval: "08:00-08:29", amount:  13},
 {timeInterval: "08:30-14:59", amount:  8},
 {timeInterval: "15:00-15:29", amount:  13},
 {timeInterval: "15:30-16:59", amount:  18},
 {timeInterval: "17:00-17:59", amount:  13},
 {timeInterval: "18:00-18:29", amount:  8},
 {timeInterval: "18:30-23:59", amount:  0}
 ]