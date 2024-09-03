export interface IRange {
    _id:          string;
    name:         string;
    name_level:   string;
    range_points: RangePoints;
    color:        string;
    info:         string;
    range:        string;
    created_at:   Date;
    __v:          number;
}

export interface RangePoints {
    range_start: number;
    range_end:   number;
}

export interface PayloadLevel {
    name:           string,
    range_points:   RangePoints,
    color:          string,
    info:           string
}

export interface IPointsUser {
    _id:           string;
    user:          string;
    ref:           string;
    expirate_date: Date;
    purchase_date: Date;
    points:        number;
    balance:       number;
    created_at:    Date;
    __v:           number;
}

