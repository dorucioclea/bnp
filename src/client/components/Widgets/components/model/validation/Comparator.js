export default class Comparator {
  compare(o1, o2) {
    throw 'not implemented yet';
  }
}

export class NumberComparator extends Comparator {
  compare(o1, o2) {
    return o1 > o2 ? 1 : (o1 === o2 ? 0 : -1);
  }
}

export class DateComparator extends Comparator {
  constructor() {
    super();

    this._comporator = new NumberComparator();
  }

  compare(o1, o2) {
    return this._comporator.compare(o1.getTime(), o2.getTime());
  }
}
