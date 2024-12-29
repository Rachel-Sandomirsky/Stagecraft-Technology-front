export class Course {
    isRegistered: any;
    code!: number; // השדה נשאר מוגדר ברמת המחלקה
    constructor(
      public title: string,
      public description: string,
      public image: string,
      public price: number,
      public rating: number,
      public reviews: number,
      public topics: string[],
    ) {}
  }
  