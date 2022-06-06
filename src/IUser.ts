interface IVarient {
    feature:string,
    value:string
}

interface IWeek {
    startTime:string,
    endTime:string,
    day:string
}


export default interface IUser {
  firstName: string;
  description: string;
  city: string;
  varient: Array<IVarient>;
  Week:Array<IWeek>;
  id:number | string
}

