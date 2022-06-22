
import { getTax } from './lib/congestionTaxCalculator'
import express, { Request, Response } from 'express';
import Vehicle from './lib/types/vehicle';
import { CalculateTaxRequest } from './lib/types/CalculateTaxRequest';
import helmet from 'helmet';
import cors from "cors";
import { validateVehicle } from './lib/validation/validateVehicle';
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
const port = 3000;


app.post('/calculateTax', (req: Request, res: Response) => {
    const { vehicle, datesString }: CalculateTaxRequest = req.body
    if(!validateVehicle(vehicle)){
        res.status(409).json({ message: "Invalid vehicle" });
    }
    if(!datesString || !Array.isArray(datesString) ||  datesString.length == 0){
        res.status(409).json({ message: "DatesString cannot be empty" });
    }
    const dates: Date[] = datesString.map(d => new Date(d))
    const vechicleObj = new Vehicle(vehicle)
    console.log(vechicleObj.getVehicleType())
    const totalTax = getTax(vechicleObj, dates)
    res.json({ totalTax: totalTax, vehicle: vechicleObj.getVehicleType() });
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});

