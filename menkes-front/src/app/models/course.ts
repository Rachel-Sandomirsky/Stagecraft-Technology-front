export class Course {
    isRegistered: any;
    constructor(
      public title: string,
      public code: number,
      public description: string,
      public image: string,
      public price: number,
      public rating: number,
      public reviews: number,
      public topics: string[],
    ) {}
  }
  